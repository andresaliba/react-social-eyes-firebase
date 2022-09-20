// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg7Yk_DGRo71LIkBlxjVQ62jrZJQRPtg0",
  authDomain: "social-media-app-firebas-73c47.firebaseapp.com",
  projectId: "social-media-app-firebas-73c47",
  storageBucket: "social-media-app-firebas-73c47.appspot.com",
  messagingSenderId: "898408860676",
  appId: "1:898408860676:web:83ccbf199486fb40def951",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
