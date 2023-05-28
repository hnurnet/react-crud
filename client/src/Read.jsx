import React, {useEffect,useState} from 'react';
import {useParams,Link} from "react-router-dom";
import axios from "axios";

function Read() {
    const {id} = useParams();
    const [student, setStudent] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8800/api/students/"+ id)
        .then(res => {
            console.log(res)
            setStudent(res.data[0]);
        })
        .then(err => console.log(err))
    
    }, [id])
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="p-2">
        <h2>Student Detail</h2>
        <h2>{student.id}</h2>
        <h2>{student.name}</h2>
        <h2>{student.email}</h2>
        <h2>{student.contact}</h2>
        </div>
        <Link to="/" className="btn btn-primary me-2">Back</Link>
        <Link className="btn btn-info" to={`/edit/${student.id}`}>Edit</Link>



        </div>
    </div>
  )
}

export default Read