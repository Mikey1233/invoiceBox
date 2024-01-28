import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBSwDjkdXR-6uWQujMduKVgPJl_T7tM-wc",
  authDomain: "invoicebox-8c747.firebaseapp.com",
  projectId: "invoicebox-8c747",
  storageBucket: "invoicebox-8c747.appspot.com",
  messagingSenderId: "811323678192",
  appId: "1:811323678192:web:af51b0e73bc6aac4fa5135",
  measurementId: "G-TNT0SWF2RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
