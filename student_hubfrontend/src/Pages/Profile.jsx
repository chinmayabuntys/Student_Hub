import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUsers, clearUser } from "../Redux/userSlice";
import toast from "react-hot-toast";
import "./Profile.css";

function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit, setEdit] = useState("");
  const [Name, setName] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const { name, email, age } = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("user");

  // Fetch profile
  const fetchProfile = async () => {

    if (!token) {
      return navigate("/login");
    }

    if(role === "std"){

      try {

      const res = await axios.get(
        `http://localhost:3000/api/${role}/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(updateUsers({ ...res.data[role] }));

    } catch (error) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(clearUser());
      navigate("/login");

    }
    } else {
      try {

      const res = await axios.get(
        `http://localhost:3000/api/${role}/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(updateUsers({ ...res.data[role] }));

    } catch (error) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(clearUser());
      navigate("/login");

    }
    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update name
  const handleupdateName = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.patch(
        `http://localhost:3000/api/${role}/updatename`,
        { name: Name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(res.data.message);
      setEdit("");
      setName("");
      fetchProfile();

    } catch (error) {

      toast.error(error.response?.data?.message);

    }

  };

  // Update password
  const handleupdatePassword = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.patch(
        `http://localhost:3000/api/${role}/updatepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(res.data.message);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(clearUser());
      navigate("/login");

    } catch (error) {

      toast.error(error.response?.data?.message);

    } finally {

      setoldPassword("");
      setnewPassword("");

    }

  };

  return (

    <div className="profile-container">

      <div className="profile-card">

        <h2>My Profile</h2>

        <div className="profile-info">

          <p><strong>Name:</strong> {name}</p>

          <button
            onClick={() => setEdit("Name")}
            className="edit-btn"
          >
            Edit Name
          </button>

          <p><strong>Email:</strong> {email}</p>

          <p><strong>Age:</strong> {age}</p>

          <p><strong>Role:</strong> {role}</p>

        </div>

        {edit === "Name" && (

          <form onSubmit={handleupdateName} className="form-section">

            <input
              type="text"
              placeholder="Enter new name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">Update Name</button>

          </form>

        )}

        <button
          onClick={() => setEdit("updatePassword")}
          className="password-btn"
        >
          Change Password
        </button>

        {edit === "updatePassword" && (

          <form onSubmit={handleupdatePassword} className="form-section">

            <input
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setoldPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />

            <button type="submit">Update Password</button>

          </form>

        )}

      </div>

    </div>

  );

}

export default Profile;