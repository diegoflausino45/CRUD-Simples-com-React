import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CadastroItems from './pages/home/CadastroItems.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CadastroItems />
  </StrictMode>,
)
