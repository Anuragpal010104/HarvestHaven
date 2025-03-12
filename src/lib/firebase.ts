// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfnOBgcFYkrE8uczMMX0ITsazixhL1aYU",
  authDomain: "harvestheaven-7feba.firebaseapp.com",
  projectId: "harvestheaven-7feba",
  storageBucket: "harvestheaven-7feba.firebasestorage.app",
  messagingSenderId: "123085761189",
  appId: "1:123085761189:web:f11fa5a699e281124bfb4c",
  measurementId: "G-WXCSTDFJ91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };