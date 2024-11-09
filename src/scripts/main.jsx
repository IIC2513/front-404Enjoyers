import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar.jsx'
import Home from '../views/home.jsx'
import Guide from '../views/guide.jsx'
import Wiki from '../views/wiki.jsx'
import About from '../views/about.jsx'
import Login from '../views/login.jsx'
import Register from '../views/register.jsx'
import Game from '../views/game.jsx'
import MatchPage from '../views/match.jsx';
import MatchDetail from '../views/matchdetails.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game" element={<Game />} />
          <Route path="/matches" element={<MatchPage />} />
          <Route path="/matches/:matchId" element={<MatchDetail />} />
      </Routes>
    </Router>
  </StrictMode>,
)
