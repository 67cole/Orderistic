import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// In the real world these keys would be hidden as environment variables
// for ease of marking we simply provided them here, acknowledging this as a security risk
const app = firebase.initializeApp({
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
});

export const auth = app.auth();

export const db = getFirestore(app);
export default app;
