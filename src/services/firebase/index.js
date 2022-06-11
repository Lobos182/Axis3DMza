// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6cPVF3tSlCZbO3diNBpef69cdxk_biLY",
  authDomain: "axis3dreact.firebaseapp.com",
  projectId: "axis3dreact",
  storageBucket: "axis3dreact.appspot.com",
  messagingSenderId: "178238484556",
  appId: "1:178238484556:web:f370fbd9b31b284a6dc4e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

 