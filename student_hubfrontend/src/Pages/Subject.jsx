import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Subject() {
  const [subject, setSubject] = useState("");
  const [allSubject, setAllSubject] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // make api call to add subject
    try {
      const res = await axios.post(
        "http://localhost:3000/api/subject/addSubject",
        { subject },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setSubject("");
      toast.success(res.data.message);
      getAllSubjects();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getAllSubjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/subject/getAllSubjects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setAllSubject(res.data.subjects);
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/");
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getAllSubjects();
    }
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?",
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/subject/deleteSubject/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message);
      getAllSubjects(); // refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <h1>Subjects</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subject}
          placeholder="Enter subject name"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <button type="submit">Add Subject</button>
      </form>

      <ul>
        {allSubject.length === 0 ? (
          <p>No subjects</p>
        ) : (
          <ul>
            {allSubject.map((sub) => (
              <li key={sub._id}>{sub.subject}<button onClick={() => handleDelete(sub._id)}>Delete</button></li>
            ))}
          </ul>
        )}
      </ul>
    </>
  );
}

export default Subject;
