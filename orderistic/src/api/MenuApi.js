import { db } from "../firebase";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

export async function ViewItems() {
  const q = collection(db, "staff");
  console.log("Grabbing Items");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

export async function AddItem(email) {
  await addDoc(collection(db, "staff"), {
    email: email,
  });
}
