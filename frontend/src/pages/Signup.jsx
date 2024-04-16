import React from 'react'
import Input from '../components/Input'

const Signup = () => {
  return (
    <div className='flex '>
      <h2>SignUp</h2>
      <Input label="FirstName"/>
      <Input label="LastName"/>
      <Input label="UserName"/>
      <Input label="Password"/>
    </div>
  )
}

export default Signup
