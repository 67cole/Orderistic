import { db } from "../firebase";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  limit,
  addDoc,
  deleteDoc,
  getDoc,
  query,
  updateDoc,
} from "firebase/firestore";
import { dishTime } from "./MenuApi";

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
  const docRef = collection(db, "orders");
  const q = query(docRef, orderBy("time_ordered", "desc"), limit(10));
  const querySnapshot = await getDocs(q);

  const orderMenu = [];
  querySnapshot.forEach((doc) => {
    orderMenu.push(doc.data());
  });
  return orderMenu;
}

// Allows all users to view the order (HIMMY-19)
export async function viewOrder() {
  const querySnapshot = await getDocs(collection(db, "orders"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
  });
}

// Allows staff to add order (HIMMY-19)
export async function addOrder(item) {
  const res = await addDoc(collection(db, "orders"), item);
}

export async function orderedFoodByTime() {
  const docRef = collection(db, "orders");
  const q = query(docRef, orderBy("time_ordered", "desc"), limit(10));
  const querySnapshot = await getDocs(q);

  const orderMenu = [];
  querySnapshot.forEach((doc) => {
    orderMenu.push([doc.data(), doc.id]);
  });
  return orderMenu;
}

//Allows staff to remove order (HIMMY-22)
export async function removeOrder(id) {
  const res = await deleteDoc(doc(db, "orders", id));
}

//Allows chef to check off items in prepared and moves order to orderHist if they are complete
export async function completeItem(orderID, itemID) {
  const docRef = doc(db, "orders", orderID);
  const matches = await getDoc(docRef);

  // grab ordered data and the completed data
  let ordered = matches.data()["food_ordered"];
  let prepared = matches.data()["food_prepared"];
  let completed = matches.data()["food_delivered"];

  for (var i in prepared) {

    if (prepared[i].id === itemID) {

      // as food is completed, change finish time first and also add to the dish times
      prepared[i].finish_time = Date.now();

      const foodItem = doc(db, "menu", itemID);
      const foodData = await getDoc(foodItem);

      // we add the time it took for the dish to be completed into the food info
      // (finish_time - ordered_time) / quantity
      let time_recorded = foodData.data()["time"];
      time_recorded.push(Math.floor(((prepared[i].finish_time - prepared[i].order_time) / prepared[i].quantity) / 1000));

      await updateDoc(foodItem, {
        time: time_recorded,
      });

      completed.push(prepared[i]);
      prepared.splice(i, 1);
    }
  }

  // update doc
  await updateDoc(docRef, {
    food_prepared: prepared,
    food_delivered: completed,
  });

  // move order to history if completed
  if (ordered.length === 0 && prepared.length === 0) {

    // set the finishing time of order first before adding
    const newDoc = await getDoc(docRef);
    let newOrder = newDoc.data();
    newOrder["time_finished"] = Math.floor(Date.now());
    await addDoc(collection(db, "ordersHist"), newOrder);

    // removing current document as it's no longer a valid order
    await deleteDoc(docRef);
  }
  
}

// Allows chef to move items from ordered to prepared
export async function prepareItem(orderID, itemID) {
  const docRef = doc(db, "orders", orderID);
  const order = await getDoc(docRef);

  let waiting = order.data()["food_ordered"];
  let preparing = order.data()["food_prepared"];

  for (var i in waiting) {

    if (waiting[i].id === itemID) {

      // move food from array to prepared and remove from ordered array
      preparing.push(waiting[i]);
      waiting.splice(i, 1);
      break;
    }
  }

  // update on our new doc
  await updateDoc(docRef, {
    food_ordered: waiting,
    food_prepared: preparing,
  });

}



// Returns the total time for an order
export async function returnOrderTime(orderID) {
  const docRef = doc(db, "orders", orderID);
  const order = await getDoc(docRef);

  // keep time counter in SECONDS
  let timeTaken = 0;

  // find all timing for food starting with completed
  const completed = order.data()["food_delivered"];
  for (var i in completed) {
    // quantity x food average time for time
    let time = completed[i].quantity * dishTime(completed[i].id);
    timeTaken += time;
  }

  // moving to still processing
  const ordered = order.data()["food_ordered"];
  for (var j in ordered) {
    let time = ordered[j].quantity * (await dishTime(ordered[j].id));
    timeTaken += time;
  }

  console.log(timeTaken);
  return timeTaken;
}
