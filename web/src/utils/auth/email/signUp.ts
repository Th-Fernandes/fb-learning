import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from "firebase/auth";

interface UserCredentials {
  email: string;
  password: string;
}

export function Auth() {
  async function signUp({email, password}:UserCredentials) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`[${errorCode}]: ${errorMessage}`)
      });
  }

  async function signIn({email, password}:UserCredentials) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(credentials => credentials.user)
  }

  async function signOut() {
    firebaseSignOut(auth).then(() => {
      console.log('user was successfully signed out')
    }).catch((error) => {
      // An error happened.
    });
  }

  function getSignedInUser(setState:React.SetStateAction<any>) {
    onAuthStateChanged(auth, user => {
      setState(user)
    })
  }
  

  return {
    signUp,
    signIn,
    signOut,
    getSignedInUser
  }
}