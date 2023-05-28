import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8800/api/students")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:8800/api/students/delete/"+id)
    .then(res => {
      window.location.reload()
    })
    .catch(err => console.log(err))
    
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-65 bg-white rounded p-3">
        <h2>Student List</h2>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">Create+</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>CONTACT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => {
              return <tr>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
                <td>
                <Link to={`/read/${student.id}`} className="btn btn-sm btn-info me-2">Read</Link>
                <Link to={`/edit/${student.id}`} className="btn btn-sm btn-info me-2">Edit</Link>
                  <button className="btn btn-sm btn-sm btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default Home;
