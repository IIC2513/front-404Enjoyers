import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Navbar />
    </Router>
  </StrictMode>,
)
