import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAlIvEaXWA4eyvxC49UtMkVIw5gXohZckM",
  authDomain: "comp3900-orderistic.firebaseapp.com",
  projectId: "comp3900-orderistic",
  storageBucket: "comp3900-orderistic.appspot.com",
  messagingSenderId: "1028996594361",
  appId: "1:1028996594361:web:2aea9f57fa1569be8b7968",
});

export const auth = app.auth();
export default app;
