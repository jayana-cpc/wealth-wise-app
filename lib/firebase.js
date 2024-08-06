import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  getAdditionalUserInfo,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    console.log("Starting sign-in with Google");
    const result = await signInWithPopup(auth, googleAuthProvider);
    console.log("Sign-in result:", result);
    return result;
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};

const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);
      return { token, user, additionalUserInfo };
    } else {
      console.log("No redirect result found.");
      return null;
    }
  } catch (error) {
    console.error("Error handling redirect result:", error);
    throw error;
  }
};

export { auth, signInWithGoogle, handleRedirectResult };
