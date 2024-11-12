import { useContext, useEffect, useState } from 'react';
import './../assets/styles/style.css'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from './auth/AuthContext';
import LogoutButton from './auth/logout';

function Navbar(){
  const {token} = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const config = {
    'method': 'get',
    'url': `${import.meta.env.VITE_BACKEND_URL}/users/1/show`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  }

  useEffect(() => {
    axios(config).then((response) => {
      console.log("Showing credentials because you are logged");
      console.log(response);
      setMsg(`Welcome, ${response.data.user.username} (${response.data.user.email})`);
    }).catch((error) => {
      console.log("An error ocurred. You are not logged.");
      console.log(error);
    })
  }, [])
  return (
    <>
        <nav>
            <Link to="/" className="navbar-logo">
              <img src="/src/assets/imgs/logo.png" alt="Logo" className="logo-image" />
            </Link>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/guide">Guide</Link></li>
              <li><Link to="/wiki">Wiki</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/matches">Ir a Partida</Link></li>
            </ul>
        </nav>
        <h3>{msg}</h3>
        <LogoutButton></LogoutButton>
    </>
  );
}

export default Navbar