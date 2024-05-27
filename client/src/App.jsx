import { Router } from "react-router-dom"
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="auth" element={<Register />}/>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
        </Routes>
    </Router>
  )
}

export default Home









