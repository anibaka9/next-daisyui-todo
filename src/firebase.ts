// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx4nodKOxwlx1auVyEbiyZ2IR6WDPt-FI",
  authDomain: "todoapp-86f7d.firebaseapp.com",
  projectId: "todoapp-86f7d",
  storageBucket: "todoapp-86f7d.appspot.com",
  messagingSenderId: "4844505802",
  appId: "1:4844505802:web:92be8234ba4d53fbe80233",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
