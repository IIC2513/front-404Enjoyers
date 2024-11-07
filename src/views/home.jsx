import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="container">
        <div className="left-column">
          <header>
            <h1>Lords of the Abyss</h1>
            <h4>There's no escape...</h4>
          </header>
          <main>
            <button id="registerBtn" type="button" onClick={() => navigate('/register')}>
              Register
            </button>
            <button id="loginBtn" type="button" onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </main>
        </div>
        <div className="right-column">
        </div>
      </div>
    </div>
  );
}

export default Home;
