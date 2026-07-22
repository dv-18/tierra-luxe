import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// StrictMode intentionally omitted: its double-invoked dev effects interfere
// with the one-shot preloader counter, GSAP timelines and Lenis init.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
