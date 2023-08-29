import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, UserCredential } from "firebase/auth";
import { provider } from "./auth_create";

export function googleAuth() {
  const auth = getAuth();
  let authError:any = {};

  async function SignIn() {
    return signInWithPopup(auth, provider)
    .then((result) => {
      const token = getAccessToken(result); // give access to google API
      return result.user // The signed-in user info.
    }).catch((error) => {
      authError = error;
      const { errorCode, errorMessage } = getSignInErrors() 
      const { email, credential } = getUsedCredentials();
    });
  }

  function getAccessToken(userCredential: UserCredential) {
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    const token = credential?.accessToken;
    return token;
  }

  function getSignInErrors() {
    return {
      errorCode: authError.code,
      errorMessage: authError.message
    }
  }

  function getUsedCredentials() {
    return {
      email: authError.customData.email, // The email of the user's account used.
      credential: GoogleAuthProvider.credentialFromError(authError) //The AuthCredential type that was used.
    }     
  }

  async function SignOut() {
    await signOut(auth);
  }

  return {
    SignIn,
    SignOut
  }
}