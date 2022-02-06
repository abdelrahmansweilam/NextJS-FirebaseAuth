// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcNKL1o2L8RTNVeWagIougNL_lz5jsuDQ",
  authDomain: "nextjs-136f2.firebaseapp.com",
  projectId: "nextjs-136f2",
  storageBucket: "nextjs-136f2.appspot.com",
  messagingSenderId: "966197932035",
  appId: "1:966197932035:web:9f47b3a84691abc32b1e36",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export { auth, firebase };
