// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e2374.firebaseapp.com",
  projectId: "mern-blog-e2374",
  storageBucket: "mern-blog-e2374.appspot.com",
  messagingSenderId: "103534571727",
  appId: "1:103534571727:web:15c4a37d0374b524af87ba",
  measurementId: "G-V0CYSG8VF3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
