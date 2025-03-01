// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuT2QYkjClk1mlwAFSaDMwC16j4cymwa8",
    authDomain: "hopefund-7748e.firebaseapp.com",
    projectId: "hopefund-7748e",
    storageBucket: "hopefund-7748e.firebasestorage.app",
    messagingSenderId: "408206320655",
    appId: "1:408206320655:web:694aefac53a70e92daef7a",
    measurementId: "G-0JB3YBJSNT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);