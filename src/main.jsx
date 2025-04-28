import React from 'react'
import ReactDOM from 'react-dom/client'
import MinimalApp from './App.minimal.jsx'
import './index.css'
import './chrome-specific.css' // Import Chrome-specific fixes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MinimalApp />
  </React.StrictMode>,
)
