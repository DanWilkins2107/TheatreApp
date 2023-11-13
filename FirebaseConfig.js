import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCEbG1lRxznZ4YZz1VVpFVmJD4uwA5bWeE",
  authDomain: "theatre-app-e41a3.firebaseapp.com",
  projectId: "theatre-app-e41a3",
  storageBucket: "theatre-app-e41a3.appspot.com",
  messagingSenderId: "255139606454",
  appId: "1:255139606454:web:206d177d25c0315e11db17",
  measurementId: "G-S29T85ZF1P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);