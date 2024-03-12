import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login.jsx'
import Header from './components/ui/Header/Header.jsx'
import Footer from './components/ui/Footer/Footer.jsx'
import './components.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Login />
    <Footer />
  </React.StrictMode>,
)
