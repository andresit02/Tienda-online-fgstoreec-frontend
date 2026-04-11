import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import { AuthProvider } from './context/AuthContext' // <--- IMPORTADO AQUÍ
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* <--- ENVOLVEMOS TODO DESDE LA RAÍZ */}
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)