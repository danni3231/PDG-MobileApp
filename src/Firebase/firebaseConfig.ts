import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcl2iq8k5FTS17KFMnasO-UD65ElcwZYA",
  authDomain: "homefy-pdg.firebaseapp.com",
  projectId: "homefy-pdg",
  storageBucket: "homefy-pdg.appspot.com",
  messagingSenderId: "226734391207",
  appId: "1:226734391207:web:57a732e2db75b9b6980082",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
