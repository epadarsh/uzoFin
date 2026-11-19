import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Application entry point: mounts <App /> into the #root DOM node declared in
// index.html. StrictMode enables extra development-only checks (e.g. it
// double-invokes effects/renders) to help surface side-effect bugs early.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
