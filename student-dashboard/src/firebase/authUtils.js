// src/firebase/authUtils.js
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const monitorAuth = (callback) => onAuthStateChanged(auth, callback);
