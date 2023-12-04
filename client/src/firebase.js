// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-3f182.firebaseapp.com",
  projectId: "mern-auth-3f182",
  storageBucket: "mern-auth-3f182.appspot.com",
  messagingSenderId: "28790261515",
  appId: "1:28790261515:web:28e6374d1f3ed5cd95c40e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);