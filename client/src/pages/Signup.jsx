import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function Signup() {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError("Error sending data :/");
        return;
      }
      setError(false);
    }
    catch (err) {
      setLoading(false);
      setError("Oops! Something went wrong.");
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-2xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-5'
      onSubmit={handleSubmit}
      >
        <input onChange={handleChange} type="text" placeholder='Username' id='userName' className='bg-slate-100 p-3 rounded-lg outline-none'/>
        <input onChange={handleChange} type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg outline-none'/>
        <input onChange={handleChange} type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg outline-none'/>
        <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div>
        <p className='text-[18px] mt-3'>
          Already have an account?
          <Link to='login'>
            <span className='text-blue-500 ml-1'>Login</span>
          </Link>
        </p>
      </div>
      <p className='mt-4 text-left text-red-500'>
        {error && error }
      </p>
    </div>
  )
}

export default Signup