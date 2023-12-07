import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';

function Profile() {
  const fileRef = useRef(null);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
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
  return (
    <div>
      <h1 className="text-3xl text-center my-10">Profile</h1>
      <form className="flex flex-col max-w-lg mx-auto">
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
          defaultValue={user.currentUser.userName}
          type="text"
          id="userName"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 outline-none mt-7"
        />
        <input
          defaultValue={user.currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3 outline-none mt-7"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 outline-none mt-7"
        />
        <button
          type="button"
          className="text-white p-3 bg-slate-700 rounded-lg uppercase mt-7 hover:opacity-95 disabled:opacity-80 active:scale-95 duration-200"
        >
          Update
        </button>
        <div className="flex justify-between mt-2">
          <span className="text-red-700 cursor-pointer">Sign Out</span>
          <span className="text-red-700 cursor-pointer">Delete Account</span>
        </div>
      </form>
    </div>
  );
}

export default Profile