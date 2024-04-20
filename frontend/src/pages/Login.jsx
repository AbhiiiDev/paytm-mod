import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";
import axios from "axios";

const Login = () => {

  const navigate=useNavigate()
  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/");
  
    } catch (error) {
      console.error("Error", error);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="border p-10 shadow-2xl shadow-slate-600 flex flex-col justify-center bg-slate-400">
        <h2 className="text-3xl font-semibold mb-4 text-center ">LogIn</h2>
        <Input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          label="UserName"
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="justify-center btn bg-black mt-2 text-white w-1/2  hover:text-black"
          >
            Log In
          </button>
        </div>
        <span className="text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="hover:text-blue-500">
            SignIn
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
