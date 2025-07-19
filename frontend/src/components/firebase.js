// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIDFUEYMoXLLrRrqGDApVtArbHOfm7x0Y",
  authDomain: "codeup-48cf2.firebaseapp.com",
  projectId: "codeup-48cf2",
  storageBucket: "codeup-48cf2.firebasestorage.app",
  messagingSenderId: "254434023726",
  appId: "1:254434023726:web:fcdc19cda2920ac3bc02bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;