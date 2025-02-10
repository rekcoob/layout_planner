import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import TagManager from 'react-gtm-module'

// Get GTM ID from environment variables
const GTM_ID = import.meta.env.VITE_GTM_ID

if (GTM_ID) {
  TagManager.initialize({ gtmId: GTM_ID })
} else {
  console.warn(
    '⚠️ GTM ID is missing! Make sure it is set in the environment variables.'
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
