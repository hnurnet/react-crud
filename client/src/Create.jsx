import React,{useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Create() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    contact: null
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues(prev=>({...prev,[e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8800/api/students/post", values);
      navigate("/");
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit} className="form">
            <h2>Add Student</h2>
            <div className="mb-2">
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Enter Name" className="form-control" name="name" onChange={handleChange} />
            </div>

            <div className="mb-2">
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Enter Email" className="form-control" name="email" onChange={handleChange}/>
            </div>

            <div className="mb-2">
                <label htmlFor="">Contact</label>
                <input type="number" placeholder="Enter Phone Num..." className="form-control" name="contact" onChange={handleChange}/>
            </div>
            <button className="btn btn-success">Submit</button>
        </form>

        </div>
    </div>
  )
}

export default Create