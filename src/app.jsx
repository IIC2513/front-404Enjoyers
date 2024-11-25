import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import MatchPage from './views/match';
import MatchDetail from './views/matchdetails'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/wiki" element={<WikiPage />} />
        <Route path="/matches" element={<MatchPage />} />
        <Route path="/matches/:matchId" element={<MatchDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
