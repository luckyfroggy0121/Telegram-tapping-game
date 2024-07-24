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
  apiKey: "AIzaSyB74ij25MDsBpKOe0B4mdeYIUHlBDmOYRM",
  authDomain: "smartlitre-daniel.firebaseapp.com",
  projectId: "smartlitre-daniel",
  storageBucket: "smartlitre-daniel.appspot.com",
  messagingSenderId: "279529940423",
  appId: "1:279529940423:web:3d03ce67a32e71ce2ee5e2",
  measurementId: "G-WKH89C35V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logoutGoogle = () => auth.signOut();

export const firestoreDB = getFirestore(app);