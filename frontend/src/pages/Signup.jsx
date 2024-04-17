
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Input from '../components/Input'
import { useState } from 'react'

const Signup = () => {
const navigate=useNavigate();
const [firstName,setfName]=useState("");
const [lastName,setlName]=useState("");
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");


const handleClick=async()=>{


  try {
    const response=await axios.post('http://localhost:3000/api/v1/user',{
      firstName,
      lastName,
      username,
      password
    });
  console.log(response)
  navigate('/dashboard')
  localStorage.setItem("token",response.data.token);
  



  } catch (error) {
    console.error('Error',error);
  }





}





  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='border p-10 shadow-2xl shadow-slate-600 flex flex-col justify-center bg-slate-400'>
      <h2 className='text-3xl font-semibold mb-4 text-center '>SignUp</h2>
  
      <Input type='text' onChange={(e)=>setfName(e.target.value)} label="FirstName"/>
      <Input type='text' onChange={(e)=>setlName(e.target.value)}  label="LastName"/>
      <Input type='text' onChange={(e)=>setUsername(e.target.value)}  label="UserName"/>
      <Input type='password' onChange={(e)=>setPassword(e.target.value)}  label="Password"/>
      <div className='flex justify-center'>
      <button onClick={handleClick}  className="justify-center btn bg-black mt-2 text-white w-1/2  hover:text-black">Sign In</button>
      </div>

     
      <span  className='text-gray-600'>Already have an account? <Link to='/login' className='hover:text-blue-500'>Login</Link></span>
    </div>
      </div>
  )
}

export default Signup
