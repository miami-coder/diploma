// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDex1EVr-FKp7-HfFdjfK1DcxiUA0h63nc",
  authDomain: "diploma-ae7a7.firebaseapp.com",
  projectId: "diploma-ae7a7",
  storageBucket: "diploma-ae7a7.appspot.com",
  messagingSenderId: "402441664245",
  appId: "1:402441664245:web:4cc126ae56b2e34de1b7bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)