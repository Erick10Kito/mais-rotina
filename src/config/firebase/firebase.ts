import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { keyTask } from "./keys";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_ID,
});

export const db = getFirestore(firebaseApp);

export const taskCollectionRef = collection(db, keyTask);
