import React from 'react'
import ReactDOM from 'react-dom/client'

//Pages
import Layout from './pages/Layout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NoPage from './pages/NoPage.jsx'

import './app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Fonction pour renvoyer la bonne page (React-rooter)
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}/>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="*" element={<NoPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App

//Appliquer les changements dans la page
const page = ReactDOM.createRoot(document.getElementById('root'));
page.render(<App />);

