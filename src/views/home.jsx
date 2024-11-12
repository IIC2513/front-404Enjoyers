import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthContext';
import { useContext, useEffect, useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);

  return (
    <div className="home">
      <div className="container">
        <div className="left-column">
          <header>
            <h1>Lords of the Abyss</h1>
            <h4>There's no escape...</h4>
          </header>
          <main>
            {!token && <button id="registerBtn" type="button" onClick={() => navigate('/register')}>
              Register
            </button>}
            {!token && <button id="loginBtn" type="button" onClick={() => navigate('/login')}>
              Log in
            </button>}
            {token && <button id="playBtn" type="button" onClick={() => navigate('/matches')}>
              Play
            </button>}
          </main>
        </div>
        <div className="right-column">
        </div>
      </div>
    </div>
  );
}

export default Home;
