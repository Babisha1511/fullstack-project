import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (email === "admin@fittrack.com") {
      navigate("/admin");
    }
    
    else if (email.endsWith("@trainer.com")) {
      navigate("/trainer");
    }
    
    else {
      navigate("/member");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h1>FitTrack</h1>
        <p>Professional Gym Management System</p>

        <input
          type="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password" placeholder="Enter password" required />

        <button type="submit">Login →</button>
      </form>
    </div>
  );
};

export default Login;
