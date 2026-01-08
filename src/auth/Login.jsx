import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/jwtUtils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      saveToken(data.token);

      // RBAC redirect
      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "TRAINER") navigate("/trainer");
      else navigate("/member");

    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Welcome Back</h2>

      <input
        placeholder="Username or Email"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
