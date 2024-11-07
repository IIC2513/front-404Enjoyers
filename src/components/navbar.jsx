import './../assets/styles/style.css'
import { Routes, Route, Link } from 'react-router-dom'


function Navbar(){
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
            </ul>
        </nav>
    </>
  );
}

export default Navbar