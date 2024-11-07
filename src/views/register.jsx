import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const checkFormValidity = () => {
    const newErrors = [];
    let allFieldsValid = true;

    if (username.length < 3) {
      newErrors.push("Username must be at least 3 characters long.");
      allFieldsValid = false;
    }

    const emailRegex = /^[^@]+@[^@]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrors.push("Email must contain a '.' after '@' (e.g., example@domain.com).");
      allFieldsValid = false;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.push("Password must be alphanumeric and at least 8 characters long.");
      allFieldsValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match.");
      allFieldsValid = false;
    }

    setErrors(newErrors);
    setIsValid(allFieldsValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkFormValidity();

    if (isValid) {
      // Redirect to game page or handle successful registration
      navigate('/game');
    }
  };

  return (
    <div className="register">

    <div className="registerBox">
      <h4>Register</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </div>
        <button type="submit" disabled={!isValid}>Submit</button>
      </form>
      {errors.length > 0 && (
          <div id="errorMessages" style={{ color: 'red' }}>
          {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
        </div>
      )}
      <button id="loginBtn" type="button" onClick={() => navigate('/login')}>
        I already have an account
      </button>
    </div>
    </div>
  );
}

export default Register;
