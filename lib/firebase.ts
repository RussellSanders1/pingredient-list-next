// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, User } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { converter } from './helpers';
import { UsernameI } from './models/username';
import { ListI } from './models/list';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyCef3U1BFcSE_GBUu4Vj9Ae4FwoAC7sMH4',
  authDomain: 'pingredient-list-13e88.firebaseapp.com',
  projectId: 'pingredient-list-13e88',
  storageBucket: 'pingredient-list-13e88.appspot.com',
  messagingSenderId: '927646139458',
  appId: '1:927646139458:web:244ef5725549ba97e319db',
  measurementId: 'G-JSV1FD4EY4',
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}


export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const dataPoint = <T>(collectionPath: string) => collection(firestore, collectionPath).withConverter(converter<T>());

export const db = {
  users: dataPoint<User>('users'),
  usernames: dataPoint<UsernameI>('usernames'),
  userLists: (userId: string) => dataPoint<ListI>(`users/${userId}/lists`),
};
