import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth,signInWithPopup} from "firebase/auth";

import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCUnzC51OaM_qIYk6hVJ3iQpawNKjkyPHw",
  authDomain: "smartlitre.firebaseapp.com",
  projectId: "smartlitre",
  storageBucket: "smartlitre.appspot.com",
  messagingSenderId: "171653683994",
  appId: "1:171653683994:web:2ae12a51f0c9bcb50beaa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logoutGoogle = () => auth.signOut();

export const firestoreDB = getFirestore(app);