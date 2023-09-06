// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu9tlxjnISM6W3myL-G3qxY8K0PG6KS8s",
  authDomain: "photofolio-14df3.firebaseapp.com",
  projectId: "photofolio-14df3",
  storageBucket: "photofolio-14df3.appspot.com",
  messagingSenderId: "307902685833",
  appId: "1:307902685833:web:4c244586a6d622df045c58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
