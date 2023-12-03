import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Login() {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate(); 

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
      const res = await fetch('/api/auth/login',
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
        setError("Error Signing in :/");
        return;
      }
      setError(false);
      navigate("/");
    }
    catch (err) {
      setLoading(false);
      setError("Oops! Something went wrong.");
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl text-center font-semibold my-7">Login</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg outline-none"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg outline-none"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div>
        <p className="text-[18px] mt-3">
          Don&apos;t have an account?
          <Link to="/signup">
            <span className="text-blue-500 ml-1">Sign Up</span>
          </Link>
        </p>
      </div>
      <p className="mt-4 text-left text-red-500">{error && error}</p>
    </div>
  );
}

export default Login