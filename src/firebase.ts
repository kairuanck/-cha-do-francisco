import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-QPxXL5L5I9Fgezrqd7WvBBmRclgB3E0",
  authDomain: "cha-do-francisco.firebaseapp.com",
  projectId: "cha-do-francisco",
  storageBucket: "cha-do-francisco.firebasestorage.app",
  messagingSenderId: "79494064238",
  appId: "1:79494064238:web:e20d480b19da95355c5e7f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
