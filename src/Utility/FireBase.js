
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuyHTqGlXCKmvDuQVCQsLpyCCus48r6MU",
  authDomain: "clone-36250.firebaseapp.com",
  projectId: "clone-36250",
  storageBucket: "clone-36250.firebasestorage.app",
  messagingSenderId: "361570618023",
  appId: "1:361570618023:web:42301f6da3e7b955a2a982",
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const auth=getAuth(app)
// export const db =app.firestore()

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };