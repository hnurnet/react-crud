import React,{useState,useEffect} from 'react';
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";

function Update() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [contact,setContact] = useState(null);
  const {id} = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8800/api/students/"+ id)
    .then(res => {
      setName(res.data[0].name);
      setEmail(res.data[0].email);
      setContact(res.data[0].contact);
      
    })
       
    .then(err => console.log(err))   

}, [id]);

const handleSubmit = async (event) => {
  event.preventDefault();
    await axios.put('http://localhost:8800/api/students/update/'+id, {name,email,contact})
    .then(res => {
      if(res.data.updated){
        navigate("/");
      } else {
        alert("Not Updated!")

      }

    })


  }

  
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
            <h2>Update Student</h2>
            <div className="mb-2">
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Enter Name" className="form-control"
                onChange={e=> setName(e.target.value)} value={name}/>
            </div>

            <div className="mb-2">
                <label htmlFor="">Email</label>
                <input type="email" placeholder="Enter Email" className="form-control"
               onChange={e=> setEmail(e.target.value)} value={email}/>
            </div>

            <div className="mb-2">
                <label htmlFor="">Contact</label>
                <input type="number" placeholder="Enter Phone Num..." className="form-control"
               onChange={e=> setContact(e.target.value)} value={contact}/>
            </div>
            <button className="btn btn-success">Update</button>
        </form>

        </div>
    </div>
  )
}

export default Update