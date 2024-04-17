import { Link } from 'react-router-dom'
import Input from '../components/Input'

const Login = () => {
  return (
<div className='flex flex-col justify-center items-center h-[100vh]'>
      <div className='border p-10 shadow-2xl shadow-slate-600 flex flex-col justify-center bg-slate-400'>
      <h2 className='text-3xl font-semibold mb-4 text-center '>LogIn</h2>
      <Input label="UserName"/>
      <Input label="Password"/>
      <button className=" bg-black text-white w-1/2 ">Log In</button>
      <span className='text-gray-600'>Don't have an account? <Link to='/signup' className='hover:text-blue-500'>SignIn</Link></span>
    </div>
      </div>
  )
}

export default Login