// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7BAJzLQQX7Zb2LpLrbgVKUANBN4tguvI",
  authDomain: "react-auth-b83f0.firebaseapp.com",
  projectId: "react-auth-b83f0",
  storageBucket: "react-auth-b83f0.appspot.com",
  messagingSenderId: "1009660309262",
  appId: "1:1009660309262:web:48f907f315312869daf15f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)