// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgnKEFKVzDVIXw_skAJyg_UQTlJZ7SNlg",
  authDomain: "user-email-password-auth-11822.firebaseapp.com",
  projectId: "user-email-password-auth-11822",
  storageBucket: "user-email-password-auth-11822.appspot.com",
  messagingSenderId: "842972714501",
  appId: "1:842972714501:web:956c7b64fd28d73d752e6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
