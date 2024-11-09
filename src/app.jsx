import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import MatchPage from './views/match'; // Importa la página de selección de partidas
import MatchDetail from './views/matchdetails' // Importa la página de detalle de partidas

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/wiki" element={<WikiPage />} />
        <Route path="/matches" element={<MatchPage />} /> {/* Ruta a la selección de partidas */}
        <Route path="/matches/:matchId" element={<MatchDetail />} />
      </Routes>
    </Router>
  );
}

export default App;