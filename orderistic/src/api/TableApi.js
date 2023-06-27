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
  query,
  where,
  updateDoc,
} from "firebase/firestore";

// Table Collection
// Each table has unique ID of documents and cart
// Each table should contain a dictionary:
// {
//    table_number: value (a int of a table number)
//    cart: [] (an array of unique ID's representing food)
// }

export async function viewTables() {
    const collectionRef = await getDocs(collection(db, "tables"));
    const tableList = [];
    collectionRef.forEach((doc) => {
      tableList.push(doc.data());
    });
    console.log(tableList);
    return tableList;
};

// Adds a table to the system
export async function addTable() {
    const collectionRef = collection(db, "tables");
    const docSnap = await getDocs(collectionRef);
    const newTableNumber = docSnap.docs.length + 1;
    const tableData = {
        number: newTableNumber,
        cart: []
    };
    await setDoc(doc(db, "tables", newTableNumber.toString()), tableData);
    console.log('Added table with ID: ', newTableNumber);
};

// Allows staff to remove highest table (HIMMY-22)
export async function removeTable() {
    const collectionRef = collection(db, "tables");
    const docSnap = await getDocs(collectionRef);
    const tableNumber = docSnap.docs.length
    await deleteDoc(doc(db, "tables", tableNumber.toString()));
    console.log('Removed table with number: ', tableNumber);
};

// Get cart
export async function viewCart(num) {
    const docRef = doc(db, "tables", num.toString());
    const docSnap = await getDoc(docRef)
    const cart = docSnap.data()["cart"];
    console.log(cart);
    return cart;
};

// Adds item to cart
export async function addToCart(num, item) {
    const collectionRef = collection(db, "tables");
    const docRef = doc(db, "tables", num.toString());
    const docSnap = await getDoc(docRef)
    let tempCart = docSnap.data()["cart"];
    tempCart.push(item);
    const newData = {
        cart: tempCart
    };
    await updateDoc(doc(db, "tables", num.toString()), newData);
    console.log("Added Item: ", item)
};

// Removes item from cart
export async function removeFromCart(num, item) {
    const collectionRef = collection(db, "tables");
    const docRef = doc(db, "tables", num.toString());
    const docSnap = await getDoc(docRef)
    let tempCart = docSnap.data()["cart"];
    let index = tempCart.indexOf(item)
    tempCart.splice(index, 1);
    const newData = {
        cart: tempCart
    };
    await updateDoc(doc(db, "tables", num.toString()), newData);
    console.log("Removed Item: ", item)
};

