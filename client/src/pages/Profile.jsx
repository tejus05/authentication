import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut } from '../redux/user/userSlice';

function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const user = useSelector((state) => state.user);
  // console.log(formData);
  const handleFileUpload = async (img) => {
      if (img.size > MAX_FILE_SIZE) {
        setImageError(true);
        return; // Exit function if file size exceeds limit
      }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${user.currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success==false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  const handleDeleteAccount = async() => {
    try {
      dispatch(deleteUserStart());
      // console.log(user.currentUser._id);
      const res = await fetch(`/api/user/delete/${user.currentUser._id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }
  const handleSignout = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      createNextState(error);
    }
  }
  return (
    <div>
      <h1 className="text-3xl text-center my-5">Profile</h1>
      <form className="flex flex-col max-w-lg mx-auto"
      onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setImageError(false);
          }}
        />
        <img
          className="h-24 w-24 self-center rounded-full cursor-pointer object-cover"
          src={formData.profilePicture || user.currentUser.profilePicture}
          alt="profile-picture"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm text-center mt-3">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image. (File size must be less than 2 mb){" "}
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">
              Uploading image... {imagePercent}%
            </span>
          ) : imagePercent === 100 ? (
            <span className="text-slate-700">Image uploaded successfully.</span>
          ) : (
            ""
          )}
        </p>
        <input
        onChange={handleChange}
          defaultValue={user.currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 outline-none mt-7"
        />
        <input
        onChange={handleChange}
          defaultValue={user.currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3 outline-none mt-7"
        />
        <input
        onChange={handleChange}
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 outline-none mt-7"
        />
        <button
          className="text-white p-3 bg-slate-700 rounded-lg uppercase mt-7 hover:opacity-95 disabled:opacity-80 active:scale-95 duration-200"
        >
          {user.loading ? "Loading" : "Update"}
        </button>
        <div className="flex justify-between mt-2">
          <span className="text-red-700 cursor-pointer" onClick={handleSignout}>Sign Out</span>
          <span className="text-red-700 cursor-pointer" onClick={handleDeleteAccount}>Delete Account</span>
        </div>
        <p className='text-red-700 mt-5'>{user.error && "Something went wrong. "}</p>
        <p className='text-green-700 mt-5'>{updateSuccess && "User is updated successfully. "}</p>
      </form>
    </div>
  );
}

export default Profile