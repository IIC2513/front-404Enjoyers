import './../assets/styles/style.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from '../views/home.jsx'
import Guide from '../views/guide.jsx'
import Wiki from '../views/wiki.jsx'
import About from '../views/about.jsx'

function Navbar(){
  return (
    <>
        <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/guide">Guide</Link></li>
              <li><Link to="/wiki">Wiki</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </>
  );
}

export default Navbar