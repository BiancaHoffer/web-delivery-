import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC20Tt-R4pFXchWKItS2uowgpJ5bVIRUCo",
  authDomain: "web-delivery-7d187.firebaseapp.com",
  projectId: "web-delivery-7d187",
  storageBucket: "web-delivery-7d187.appspot.com",
  messagingSenderId: "315176406164",
  appId: "1:315176406164:web:6ff72b578b58959cadf881",
  measurementId: "G-9NEG3H0EZ8"
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);