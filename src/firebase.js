import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCFKpQbFyB8LkoUQyPPLAKA2bq9eqPbt8Y",
  authDomain: "whatsapp-clone-5e793.firebaseapp.com",
  projectId: "whatsapp-clone-5e793",
  storageBucket: "whatsapp-clone-5e793.appspot.com",
  messagingSenderId: "669961387283",
  appId: "1:669961387283:web:31704188ccd1e68770eee6",
  measurementId: "G-K492ZK7K4B",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); //gets to our database
const auth = firebase.auth(); //for authentication
const provider = new firebase.auth.GoogleAuthProvider(); //for google Authentication

export { auth, provider };
export default db;
