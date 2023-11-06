// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { G } from "react-native-svg";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD8yq5aqe6cV_6OS2Z095n1H5gChR-uQU",
  authDomain: "safesteps-6a1bb.firebaseapp.com",
  databaseURL: "https://safesteps-6a1bb-default-rtdb.firebaseio.com",
  projectId: "safesteps-6a1bb",
  storageBucket: "safesteps-6a1bb.appspot.com",
  messagingSenderId: "605033499652",
  appId: "1:605033499652:web:cb2ff98f6070d3bcb2b951",
  measurementId: "G-9K9G3TZHZZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export db

export const db = getFirestore(app);
