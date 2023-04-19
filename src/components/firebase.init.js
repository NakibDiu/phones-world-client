// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQIWdL_0eOpwoWhHotfLycHrx8dVp1Mbc",
  authDomain: "phonedata-dba9f.firebaseapp.com",
  projectId: "phonedata-dba9f",
  storageBucket: "phonedata-dba9f.appspot.com",
  messagingSenderId: "1070909755681",
  appId: "1:1070909755681:web:8cbff7e74eaaaff4f3ae60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;