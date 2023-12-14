import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function Header() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="text-[20px]">Authentication App</h1>
        </Link>
        <ul className="flex gap-7">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {currentUser ? (
            <li>
              <Link to="/profile">
                <img
                  src={currentUser.profilePicture}
                  alt="profile-pic"
                  className="h-[30px] w-[30px] rounded-full object-cover"
                />
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header
