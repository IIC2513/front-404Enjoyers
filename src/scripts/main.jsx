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
import GameBoard from '../views/GameBoard.jsx';
import AuthProvider from '../components/auth/AuthProvider.jsx';
import Inventory from '../views/inventory';
import Stats from '../views/stats.jsx';
import Scoreboard from '../views/scoreboard.jsx';
import Friends from '../components/user/friends.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
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
          <Route path="/boards/:matchId" element={<GameBoard />} />
          <Route path="/inventories/:inventoryId" element={<Inventory />} />
          <Route path="/stats/:characterId" element={<Stats />} />
          <Route path="/scoreboard/:matchId" element={<Scoreboard />} />
          <Route path="/user/:userId/friends" element={<Friends />} />
      </Routes>
    </Router>
    </AuthProvider>
  </StrictMode>,
)
