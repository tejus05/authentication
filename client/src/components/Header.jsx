import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
          <h1 className="text-[20px]">Authentication App</h1>
        </Link>
        <ul className='flex gap-7'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/login'>
            <li>Login</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header
