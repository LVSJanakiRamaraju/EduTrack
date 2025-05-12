// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2lHEE9h4gK2VXpOCoo5AI6KjWuAhW4vI",
  authDomain: "studentdashboard-babycode.firebaseapp.com",
  projectId: "studentdashboard-babycode",
  storageBucket: "studentdashboard-babycode.firebasestorage.app",
  messagingSenderId: "11543254602",
  appId: "1:11543254602:web:31e925b64ecc33cc9ff8b3",
  measurementId: "G-L80QK2302Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };