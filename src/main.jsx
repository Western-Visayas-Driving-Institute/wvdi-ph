import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './chrome-specific.css' // Import Chrome-specific fixes

// Pre-import react-icons to ensure they're bundled correctly
import 'react-icons/fa'
import 'react-icons/bs'
import 'react-icons/io5'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
