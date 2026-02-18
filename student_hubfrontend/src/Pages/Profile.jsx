import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUsers, clearUser } from "../Redux/userSlice";
import toast from "react-hot-toast";
import './Profile.css'

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit, setEdit] = useState("");
  const [Name, setName] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const { name, email, age } = useSelector((state) => state.user);

  // ✅ moved outside
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return navigate("/login");
    }

    try {
      const res = await axios.get(
        "http://localhost:3000/api/std/get",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updateUsers({ ...res.data.std, token }));
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(clearUser());
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ update name
  const handleupdateName = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.patch(
        "http://localhost:3000/api/std/updatename",
        { name: Name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
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

  // ✅ update password
  const handleupdatePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.patch(
        "http://localhost:3000/api/std/updatepassword",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);
      localStorage.removeItem("token");
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
        <button onClick={() => setEdit("Name")} className="edit-btn">
          Edit Name
        </button>

        <p><strong>Email:</strong> {email}</p>
        <p><strong>Age:</strong> {age}</p>
      </div>

      {edit === "Name" && (
        <form onSubmit={handleupdateName} className="form-section">
          <input
            type="text"
            placeholder="Enter new Name"
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