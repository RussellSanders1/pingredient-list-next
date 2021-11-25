// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCef3U1BFcSE_GBUu4Vj9Ae4FwoAC7sMH4",
  authDomain: "pingredient-list-13e88.firebaseapp.com",
  projectId: "pingredient-list-13e88",
  storageBucket: "pingredient-list-13e88.appspot.com",
  messagingSenderId: "927646139458",
  appId: "1:927646139458:web:244ef5725549ba97e319db",
  measurementId: "G-JSV1FD4EY4"
};

// Initialize Firebase
let app;
if(!getApps().length){
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(firebaseConfig.projectId)
}

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app)
export const storage = getStorage(app)
