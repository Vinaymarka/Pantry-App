// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firestore from "firebase/firestore";
import {getFirestore} from "firebase/firestore"; 
// import {collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB3-uGIJ63MVrFZh9BeURf2Xs1glVQc7M",
  authDomain: "pantryapp-e556f.firebaseapp.com",
  projectId: "pantryapp-e556f",
  storageBucket: "pantryapp-e556f.appspot.com",
  messagingSenderId: "413565099606",
  appId: "1:413565099606:web:6b014b26706a1b55a825f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); 
export {app,firestore}