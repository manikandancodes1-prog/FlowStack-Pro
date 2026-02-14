import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext' 
import "@fontsource/inter";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* ஆப்-ஐ இங்கே சுற்றுகிறோம் */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
)