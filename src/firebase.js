import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvxZJODjOY-OWj9s6-_3wwUD6ImJzxaFk",
  authDomain: "vulpi-9f484.firebaseapp.com",
  projectId: "vulpi-9f484",
  storageBucket: "vulpi-9f484.firebasestorage.app",
  messagingSenderId: "630630083093",
  appId: "1:630630083093:web:831dcb9ec5d7aaf4673c1c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;