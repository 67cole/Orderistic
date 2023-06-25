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


// Grabbing all food information for front-end purposes
export async function returnFoodData() {
  const docRef = await getDocs(collection(db, "menu"));
  const foodMenu = [];
  docRef.forEach((doc) => {
    foodMenu.push(doc.data());
  });
  return foodMenu;
}

//Allows all users to view the menu HIMMY-19
export async function ViewMenu() {
  const q = collection(db, "menu");
  console.log("Grabbing Items");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  
}

//Allows staff to add items to the menu HIMMY-20
export async function AddItem(item) {
  const res = await addDoc(collection(db, 'menu'), item);
  console.log('Added document with ID: ', res.id);
}

//Allows staff to remove items from the menu HIMMY-22
export async function RemoveItem(id) {
  const res = await deleteDoc(doc(db, 'menu', id));
  console.log('Removed document with ID: ', id);
}

//Allows staff to update items on the menu HIMMY-21
export async function UpdateItem(id, item) {
  const res = await setDoc(doc(db, 'menu', id), item);
  console.log('Updated document with ID: ', id);
}

