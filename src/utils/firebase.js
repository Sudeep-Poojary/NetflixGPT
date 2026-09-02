// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflixgpt-1f344.firebaseapp.com",
  projectId: "netflixgpt-1f344",
  storageBucket: "netflixgpt-1f344.firebasestorage.app",
  messagingSenderId: "1061633279867",
  appId: "1:1061633279867:web:d30a568250e38673e21fde",
  measurementId: "G-1SFF26BYRK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
