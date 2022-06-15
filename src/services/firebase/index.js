
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

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