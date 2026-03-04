import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState("std");
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3000/api/${role}/login`,
        user,
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", role);
      toast.success(res.data.message);
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Welcome Back</h2>
        <button type="button" style={{ backgroundColor: '#48de98' }} onClick={() => setRole("std")}>
          Student
        </button>
        <button type="button" style={{ backgroundColor: "#F8D0FE" }} onClick={() => setRole("trainer")}>
          Trainer
        </button>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={
            role === "std"
              ? { backgroundColor: "#48de98" }
              : { backgroundColor: "#F8D0FE" }
          }
        >
          Login as {role === "std" ? "Student" : "Trainer"}
        </button>

        <p className="login-footer">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
