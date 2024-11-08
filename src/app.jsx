import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Match from './views/match';
import Game from './views/game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Match />} />            {/* Pantalla de selección de partida */}
        <Route path="/game/:matchId" element={<Game />} /> {/* Pantalla de juego */}
      </Routes>
    </Router>
  );
}

export default App;