import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkFormValidity();
  }, [username, password]);

  const checkFormValidity = () => {
    const newErrors = [];
    let allFieldsValid = true;

    // Username validation
    if (username.length < 3) {
      newErrors.push("Username must be at least 3 characters long.");
      allFieldsValid = false;
    }

    // Password validation (alphanumeric and at least 8 characters)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.push("Password must be alphanumeric and at least 8 characters long.");
      allFieldsValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(allFieldsValid);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fix the highlighted errors before submitting.");
    } else {
      // Redirect to the game page
      navigate('/game'); // Assuming you have a /game route
    }
  };

  return (
    <div className="login">
      <main>
        <div className="loginBox">
          <h4>Log in</h4>
          <form id="loginForm" onSubmit={handleFormSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" id="submitBtn" value="Log in" disabled={!isFormValid} />
          </form>
          <div id="errorMessages" style={{ color: 'red' }}>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
          <button id="registerBtn" type="button" onClick={() => navigate('/register')}>
            I don't have an account
          </button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default Login;
