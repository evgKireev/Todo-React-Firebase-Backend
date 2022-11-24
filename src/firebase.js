// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA4yJtjgRsm3qkqDfaCXUhVobgew-OpHnM',
  authDomain: 'todo-app-yt-7a580.firebaseapp.com',
  projectId: 'todo-app-yt-7a580',
  storageBucket: 'todo-app-yt-7a580.appspot.com',
  messagingSenderId: '417652635092',
  appId: '1:417652635092:web:32f8151dcfabcd7cb01241',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

