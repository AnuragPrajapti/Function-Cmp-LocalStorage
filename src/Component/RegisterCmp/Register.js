import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { NavLink, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const navigate = useNavigate;
    
    const {id }= useParams();
    let Data = JSON.parse(localStorage.getItem("register"))
    const [ list , setList ] = useState([...Data]); 
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    date: "",
    password: ""
  })

  useEffect(() => {
    const record = Data[id]
    if (record) {
      setInpval({
        name : record?.name,
        email : record?.email,
        date : record?.date,
        passsword : record?.password
      })
    }
  }, [])
  const handleCancel=()=>{
    window.location.href="/"
  }
 
  const addData = (e) => {
    e.preventDefault();

    const { name, email, date, password } = inpval;

    if (name === "") {
      toast.error(' name field is requred!', {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error('email field is requred', {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error('plz enter valid email addres', {
        position: "top-center",
      });
    } else if (date === "") {
      toast.error('date field is requred', {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error('password field is requred', {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error('password length greater five', {
        position: "top-center",
      });
    } else {
      console.log("data added succesfully");
      history("/login")
 
      if(id){
        let object = list[id];
        console.log("update object",object)
        list.splice(id,1,{
          name:object?.name,
          email:object?.email,
          date:object?.date,
          password:object?.password,
        })
        setList(list)
        console.log("updated Data",list)
        localStorage.getItem("register",JSON.stringify(list));
      }else{
       var list = JSON.parse(localStorage.getItem("register"));
       let data = list ? list : [];
       localStorage.setItem("register", JSON.stringify([...data, inpval]));
      }
        
    }



  }

  return (
    <>
      <div className="container mt-3">
        <section className='d-flex justify-content-between'>
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className='text-center col-lg-6'>Register Here!!</h3>
            <Form >
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                <Form.Control type="text" name='name' value={inpval.name} onChange={(e)=>setInpval({...inpval,name:e.target.value})} placeholder="Enter Your Name" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                <Form.Control type="email" name='email'value={inpval.email} onChange={(e)=>setInpval({...inpval,email:e.target.value})} placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                <Form.Control value={inpval.date} onChange={(e)=>setInpval({...inpval,date:e.target.value})} name='date' type="date" />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                <Form.Control type="password" name='password' value={inpval.password} onChange={(e)=>setInpval({...inpval,password:e.target.value})} placeholder="Password" />
              </Form.Group>
              {
               id ? 
               <span>
                <Button type="submit" variant="primary"  style={{ background: "rgb(67, 185, 127)" }} onClick={addData} >Update</Button>
                <Button type="reset"  variant="primary"  style={{ background: "rgb(67, 185, 127)" }}onClick={()=>handleCancel()}>cancel</Button>
               </span>
               :
               <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
               Register
              </Button>
              }
              
            </Form>
            <p className='mt-3'>Already Have an Account <span><NavLink to="/login">Login</NavLink></span> </p>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  )
}

export default Register