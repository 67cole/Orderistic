import { db } from "../firebase";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

// Order Collection
// Each order has unique ID's of documents, each representing a order's cart
// Each order should contain a dictionary:
// {
//    food_ordered: [] (an array of unique ID's representing food)
//    table_number: value (a int of a table number)
//    time_ordered: timestamp (a timestamp of when the order was placed)
//    time_finished: timestamp (a timestamp of order completion)
// }

// Grabbing all information orders information for front-end purposes
export async function returnOrderData() {
  const docRef = await getDocs(collection(db, "orders"));
  const orderMenu = [];
  docRef.forEach((doc) => {
    orderMenu.push(doc.data());
  });
  console.log(orderMenu);
  return orderMenu;
}

// Allows all users to view the order (HIMMY-19)
export async function viewOrder() {
  const querySnapshot = await getDocs(collection(db, "orders"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

// Allows staff to add order (HIMMY-19)
export async function addOrder(item) {
  const res = await addDoc(collection(db, "orders"), item);
  console.log('Added document with ID: ', res.id);
}

//Allows staff to remove order (HIMMY-22)
export async function removeOrder(id) {
  const res = await deleteDoc(doc(db, "orders", id));
  console.log('Removed document with ID: ', id);
}






