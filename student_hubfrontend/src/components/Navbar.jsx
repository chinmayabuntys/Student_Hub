import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../Redux/userSlice";
import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name } = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("user");
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser());
    toast.success("Logout Successful");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">MyApp</h2>

      <div className="nav-links">
        {token ? (
          <>
            <span className="welcome">
              Welcome, {name || "User"}
            </span>

            <Link to="/profile">Profile</Link>
            <Link to="/subjects">Subjects</Link>

            {role === "trainer" && ( <Link to="/allstudents">All Students</Link> )}

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;