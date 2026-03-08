import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AllStudents() {

  const [students,setStudents] = useState([]);

  const token = localStorage.getItem("token");

  const fetchStudents = async () => {

    try{

      const res = await axios.get(
        "http://localhost:3000/api/trainer/allstudents",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      // console.log(res.data); // debug

      setStudents(res.data.students);

    }catch(error){

      toast.error("Failed to load students");

    }

  };

  useEffect(()=>{
    fetchStudents();
  },[]);

  return (

    <div>

      <h2>All Students</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        students.map((std)=>(
          <div key={std._id} style={{border:"1px solid #ccc", padding:"10px", marginBottom:"10px"}}>
            <p>Name: {std.name}</p>
            <p>Email: {std.email}</p>
            <p>Age: {std.age}</p>
          </div>
        ))
      )}

    </div>

  );

}

export default AllStudents;