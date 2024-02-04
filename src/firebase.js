// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfOGCwU3ip82qIuAihhWiQv_X2GfMPfZs",
  authDomain: "goodnuts-a140f.firebaseapp.com",
  projectId: "goodnuts-a140f",
  storageBucket: "goodnuts-a140f.appspot.com",
  messagingSenderId: "749170146380",
  appId: "1:749170146380:web:3b0f03e0ff43ba12d648e9",
  measurementId: "G-VT8B0W64Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app
export const auth = getAuth(app)