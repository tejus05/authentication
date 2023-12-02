import React from 'react'
import {Link} from 'react-router-dom'

function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-2xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-5'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg outline-none'/>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg outline-none'/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg outline-none'/>
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div>
        <p className='text-[18px] mt-3'>
          Already have an account?
          <Link to='login'>
            <span className='text-blue-500 ml-1'>Login</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup