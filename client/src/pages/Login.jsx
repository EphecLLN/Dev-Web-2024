import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      setMessage("Bien connecté");
    } catch (error) {
         
    }
  };

  return (
    <div style={{ textAlign: "center", fontSize: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {message && <p style={{ color: message === "Bien connecté" ? "green" : "red" }}>{message}</p>}
      </form>
    </div>
  );
};

export default App;



