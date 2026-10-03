import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/shell.css'
import './styles/pages.css'
import App from './App'
import { installSfx } from './lib/sfx'

installSfx()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
