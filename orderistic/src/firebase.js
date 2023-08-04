import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// In the real world these keys would be hidden as environment variables
// for ease of marking we simply provided them here, acknowledging this as a security risk
const app = firebase.initializeApp({
  apiKey: "AIzaSyAlIvEaXWA4eyvxC49UtMkVIw5gXohZckM",
  authDomain: "comp3900-orderistic.firebaseapp.com",
  projectId: "comp3900-orderistic",
  storageBucket: "comp3900-orderistic.appspot.com",
  messagingSenderId: "1028996594361",
  appId: "1:1028996594361:web:2aea9f57fa1569be8b7968",
});

export const auth = app.auth();

export const db = getFirestore(app);
export default app;
