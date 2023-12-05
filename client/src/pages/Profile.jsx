import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const user = useSelector(state => state.user);
  return (
    <div>
      <h1 className="text-3xl text-center my-10">Profile</h1>
      <form className='flex flex-col max-w-lg mx-auto'>
        <img className='h-24 w-24 self-center rounded-full cursor-pointer object-cover'
          src={user.currentUser.profilePicture}
          alt="profile-picture"
        />
        <input defaultValue={user.currentUser.userName} type="text" id='userName' placeholder='Username' className='bg-slate-100 rounded-lg p-3 outline-none mt-7' />
        <input defaultValue={user.currentUser.email} type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3 outline-none mt-7' />
        <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3 outline-none mt-7' />
        <button type='button' className='text-white p-3 bg-slate-700 rounded-lg uppercase mt-7 hover:opacity-95 disabled:opacity-80 active:scale-95 duration-200'>Update</button>
        <div className='flex justify-between mt-2'>
          <span className='text-red-700 cursor-pointer'>Sign Out</span>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
        </div>
      </form>
    </div>
  );
}

export default Profile
