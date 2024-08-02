import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDweyXw33I_6zX6ofY2cLwCuEQ0gbt2cTo",
  authDomain: "gem-edu.firebaseapp.com",
  projectId: "gem-edu",
  storageBucket: "gem-edu.appspot.com",
  messagingSenderId: "678770855959",
  appId: "1:678770855959:web:c510b05bc7d8c0e1d5cc52",
  measurementId: "G-GBR1TH1Z59"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { app, auth, firestore };
