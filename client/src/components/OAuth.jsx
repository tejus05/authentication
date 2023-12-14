import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log(result.user);
      const res = await fetch('/api/auth/google', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      });
      const data = await res.json();
      // console.log(data);
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not login with Google. ", error);
    }
  }
  return (
    <div>
      <button className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full text-center" type='button' onClick={handleGoogleClick}>
        Continue With Google
      </button>
    </div>
  );
}

export default OAuth
