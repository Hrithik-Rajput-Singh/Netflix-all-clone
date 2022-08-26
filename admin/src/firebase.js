import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "netflix-reactjs-7ca2e.firebaseapp.com",
  projectId: "netflix-reactjs-7ca2e",
  storageBucket: "netflix-reactjs-7ca2e.appspot.com",
  messagingSenderId: "479073612007",
  appId: "1:479073612007:web:908577aa1d51424ae43242",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
