import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/ui/Header/Header.jsx'
import Footer from './components/ui/Footer/Footer.jsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Footer />
  </React.StrictMode>,
)
