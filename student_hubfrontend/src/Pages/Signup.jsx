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
  
  const [role, setRole] = useState("std");
  const [trainercode, setTrainerCode] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3000/api/${role}/signup`,
        { ...user, trainercode }
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
        <button type="button" style={{ backgroundColor: '#48de98' }} onClick={() => setRole("std")}>
          Student
        </button>

        <button type="button" style={{ backgroundColor: "#F8D0FE" }} onClick={() => setRole("trainer")}>
          Trainer
        </button>
        
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
        {
          role === 'trainer' && <input type='text' placeholder="Enter Trainer Secret Code" value={trainercode} onChange={(e) => setTrainerCode(e.target.value)} />
        }

        <button type="submit" style={
          role === "std"
            ? { backgroundColor: "#48de98" }
            : { backgroundColor: "#F8D0FE" }
        }>
          Signup as {role === "std" ? "Student" : "Trainer"}
        </button>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
