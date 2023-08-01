import { db } from "../firebase";
import { addOrder } from "./OrderApi";
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
//    status: string (a string representing table status "active/empty")
// }

export async function viewTables() {
  const collectionRef = await getDocs(collection(db, "tables"));
  const tableList = [];
  collectionRef.forEach((doc) => {
    tableList.push(doc.data());
  });
  return tableList;
}

// Adds a table to the system
export async function addTable() {
  const collectionRef = collection(db, "tables");
  const docSnap = await getDocs(collectionRef);
  const newTableNumber = docSnap.docs.length + 1;
  const tableData = {
    number: newTableNumber,
    cart: [],
    help: false,
    bill: false,
  };
  await setDoc(doc(db, "tables", newTableNumber.toString()), tableData);
}

// Allows staff to remove highest table (HIMMY-22)
export async function removeTable() {
  const collectionRef = collection(db, "tables");
  const docSnap = await getDocs(collectionRef);
  const tableNumber = docSnap.docs.length;
  await deleteDoc(doc(db, "tables", tableNumber.toString()));
}

// Get cart
export async function viewCart(num) {
  const docRef = doc(db, "tables", num.toString());
  const docSnap = await getDoc(docRef);
  const cart = docSnap.data()["cart"];
  return cart;
}

// Adds item to cart
export async function addToCart(num, item) {
  const collectionRef = collection(db, "tables");
  const docRef = doc(db, "tables", num.toString());
  const docSnap = await getDoc(docRef);
  let cartData = docSnap.data()["cart"];
  for (var i in cartData) {
    if (cartData[i].id === item.id) {
      cartData[i].quantity += item.quantity;
      const newData = {
        cart: cartData,
      };
      await updateDoc(doc(db, "tables", num.toString()), newData);
      return;
    }
  }
  cartData.push(item);
  const newData = {
    cart: cartData,
  };
  await updateDoc(doc(db, "tables", num.toString()), newData);
}

// Sets help to true
export async function requestHelp(num) {
  const newData = {
    help: true,
  };
  await updateDoc(doc(db, "tables", num.toString()), newData);
}

export async function removeHelp(num) {
  const newData = {
    help: false,
  };
  await updateDoc(doc(db, "tables", num.toString()), newData);
}
export async function requestBill(num) {
  const newData = {
    bill: true,
  };
  await updateDoc(doc(db, "tables", num.toString()), newData);
}

export async function removeBill(num) {
  const newData = {
    bill: false,
  };
  await updateDoc(doc(db, "tables", num.toString()), newData);
}

// Removes item from cart
export async function removeFromCart(num, item) {
  const collectionRef = collection(db, "tables");
  const docRef = doc(db, "tables", num.toString());
  const docSnap = await getDoc(docRef);
  let cartData = docSnap.data()["cart"];
  for (var i in cartData) {
    if (cartData[i].id === item.id) {
      if (item.quantity >= cartData[i].quantity) {
        let tempCart = cartData;
        tempCart.splice(i, 1);
        const newData = {
          cart: tempCart,
        };
        await updateDoc(doc(db, "tables", num.toString()), newData);
        return;
      } else {
        cartData[i].quantity -= item.quantity;
        const newData = {
          cart: cartData,
        };
        await updateDoc(doc(db, "tables", num.toString()), newData);
        return;
      }
    }
  }
}

//Allows customers to send their order to the staff or chef
//Makes the order ready for the chef
export async function sendOrder(tableNumber, user_id) {
  const docRef = doc(db, "tables", tableNumber.toString());
  const docSnap = await getDoc(docRef);
  let tempCart = docSnap.data()["cart"];

  // grab current time of order in seconds
  let currTime = Math.floor(Date.now());

  const orderData = {
    food_ordered: tempCart,
    food_delivered: [],
    food_prepared: [],
    table_number: tableNumber,
    time_ordered: currTime,
    time_finished: 0,
    uid: user_id,
  };

  addOrder(orderData);
  const newCart = {
    cart: [],
    number: tableNumber,
  };
  setDoc(docRef, newCart);
}

// Returns database of all tables
export async function tableData() {
  const docRef = await getDocs(collection(db, "tables"));
  const tableInfo = {};

  // loop through each document
  // for every key is the table number and the value is the info
  docRef.forEach((doc) => {
    let table = doc.data();
    tableInfo[doc.id] = table;
  });

  return tableInfo;
}

// Given a table number, return the current orders and previous orders
export async function returnOrdersForTable(table_no) {
  const ordersDocRef = await getDocs(collection(db, "orders"));
  const ordersHistDocRef = await getDocs(collection(db, "ordersHist"));

  // we return a dictionary which has current orders and previous orders as key, and their respective data for values
  const orders = {};
  orders["currOrders"] = [];
  orders["prevOrders"] = [];

  // now loop through all the collection of prev and curr orders
  // starting off with current orders
  ordersDocRef.forEach((doc) => {
    // check if we're on the right number
    if (doc.data()["table_number"] === table_no) {
      const orderInfo = doc.data();
      orderInfo["id"] = doc.id;
      orders["currOrders"].push(orderInfo);
    }
  });

  // now with previous orders
  ordersHistDocRef.forEach((doc) => {
    // check if we're on the right number
    if (doc.data()["table_number"] === table_no) {
      const orderInfo2 = doc.data();
      orderInfo2["id"] = doc.id;
      orders["prevOrders"].push(orderInfo2);
    }
  });

  return orders;
}
