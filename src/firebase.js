import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCscYgty-qAtWegLh_SXZfRZv1YXz8E5O0",
  authDomain: "rinkeby-punks.firebaseapp.com",
  projectId: "rinkeby-punks",
  storageBucket: "rinkeby-punks.appspot.com",
  messagingSenderId: "49404292805",
  appId: "1:49404292805:web:6b3e72e269418cff874aac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;