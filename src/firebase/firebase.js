// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhWexki9AVdrpb5UldDpmcoegLG2FpM3A",
  authDomain: "phase-5-project-c1a78.firebaseapp.com",
  projectId: "phase-5-project-c1a78",
  storageBucket: "phase-5-project-c1a78.firebasestorage.app",
  messagingSenderId: "243703869938",
  appId: "1:243703869938:web:b36a354a8a88d447c4bb6b",
  measurementId: "G-K0NJZF7MWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics, app };