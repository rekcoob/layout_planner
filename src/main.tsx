import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import ReactGA from 'react-ga4'

const GTM_ID = import.meta.env.VITE_GTM_ID
ReactGA.initialize(GTM_ID)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
