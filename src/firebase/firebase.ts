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
  apiKey: "AIzaSyCS8vjr-DS6-HG5xe6l2gE35fhj3o6JBc0",
  authDomain: "carbide-ratio-429520-a1.firebaseapp.com",
  projectId: "carbide-ratio-429520-a1",
  storageBucket: "carbide-ratio-429520-a1.appspot.com",
  messagingSenderId: "696995656499",
  appId: "1:696995656499:web:79d7e97b414da9edaf8446",
  measurementId: "G-RKVBGL8PW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logoutGoogle = () => auth.signOut();

export const firestoreDB = getFirestore(app);