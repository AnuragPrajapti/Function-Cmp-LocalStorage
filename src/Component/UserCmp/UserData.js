import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './UserData.css'


const UserData = () => {
  const navigate = useNavigate();
  let Data = JSON.parse(localStorage.getItem("register"))
  const [ list , setList ] = useState(Data); 
  const handleDelete=(id)=>{
      let user = Data
       user.splice(id,1);
       setList(user)
       localStorage.setItem("register",JSON.stringify(user))
  }
  const handleEdit=(id)=>{
    navigate(`/register/${id}`);
  }
  return (
    <div className='container'>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Password</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            list?.map((e,id)=>{
            return(
              <tr key={id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.date}</td>
              <td>{e.password}</td>
              <td><button  className="btn btn-danger" onClick={()=>handleDelete(id)}>Delete</button></td>
              <td><button className='btn btn-warning' onClick={()=>handleEdit(id)}>Edit</button></td>

            </tr>
            )
            })
          }
        </tbody>
      </table>
      <p className="mt-2">
              Don't have account? <Link to="/register">Register</Link>
            </p>
    </div>
  )
}

export default UserData
