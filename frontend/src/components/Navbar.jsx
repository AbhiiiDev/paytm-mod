import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Navbar = () => {
const navigate=useNavigate();

const [userName,setUserName]=useState("");

const getUserDetail=async()=>{
  try {
    const response = await axios.get(
      'http://localhost:3000/api/v1/user/profile',
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    setUserName(response.data.firstName);
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};



useEffect(()=>{
  getUserDetail();
},[])

const handleLogout=()=>{

  localStorage.setItem("token","");
  navigate('/login');
}



  return (
    <div className="navbar bg-base-100 shadow-lg">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">PayTM</a>
    </div>
    <div className="flex-none">
    <div>
      <span>Hey, { localStorage
      .getItem("token") ? userName : <Link to='/login'>Login</Link>
      }</span>
    </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
  
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Navbar
