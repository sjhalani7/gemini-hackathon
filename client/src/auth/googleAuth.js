import { auth } from './firebaseConfig';
import firebase from 'firebase/compat/app';

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

const signOut = () => {
  auth.signOut();
};

export { signInWithGoogle, signOut };
