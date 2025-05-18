import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import ContactPage from './components/ContactPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router> {/* Wrap your application with Router */}
      <Routes> {/* Define your routes within Routes */}
        {/* Route for the Contact Page */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Route for the Home Page or the main App content */}
        {/* The '*' path matches any path not matched by previous routes */}
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
)
