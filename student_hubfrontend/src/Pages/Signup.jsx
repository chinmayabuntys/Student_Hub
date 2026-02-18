import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Signup.css";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/std/signup",
        user
      );

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2 style={{textAlign:"center"}}>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Age"
          name="age"
          value={user.age}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn">Signup</button>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
