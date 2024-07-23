import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth,signInWithPopup} from "firebase/auth";

import {getFirestore} from "firebase/firestore"




// const firebaseConfig = {
//   apiKey: "AIzaSyAwmohNC33lZ-ZKGrNicFoM0vPbdR--cGo",
//   authDomain: "daniel-smartlitre.firebaseapp.com",
//   projectId: "daniel-smartlitre",
//   storageBucket: "daniel-smartlitre.appspot.com",
//   messagingSenderId: "1090634472803",
//   appId: "1:1090634472803:web:49238ed1cb68bc6067c756",
//   measurementId: "G-R8YY93X9N2"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDfaYJJlbpGJWpT_RP64eoA-1hVTcMjnKI",
  authDomain: "smartlitre-422a0.firebaseapp.com",
  projectId: "smartlitre-422a0",
  storageBucket: "smartlitre-422a0.appspot.com",
  messagingSenderId: "1496083486",
  appId: "1:1496083486:web:4f9dc5232a4870bca2520f",
  measurementId: "G-F7BD85N1ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logoutGoogle = () => auth.signOut();

export const firestoreDB = getFirestore(app);