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
  updateDoc,
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

//Allows staff to remove order (HIMMY-22)
export async function removeOrder(id) {
  const res = await deleteDoc(doc(db, "orders", id));
}



//Allows chef to check off items and moves order to orderHist if they are complete
export async function completeItem(orderID, itemID) {
  const docRef = doc(db, "orders", orderID);
  const matches = await getDoc(docRef);

  // grab ordered data and the completed data
  let ordered = matches.data()["food_ordered"];
  let completed = matches.data()["food_completed"];
  
  // decrement from ordered array
  for (var i in ordered) {
    
    // found matching food in ordered array
    // decrement quantity
    if (ordered[i].id === itemID) {
      ordered[i].quantity -= 1;
      break;
    }
  }

  // now loop through completed array
  let added = 0;
  for (var j in completed) {

    // found matching food in completed array
    // increment quantity
    if (completed[j].id === itemID) {
      completed[j].quantity += 1;
      added = 1;
      break;
    }
  }

  // if there's no item found, then we add onto the completed array
  if (added === 0) {
    let foodInfo = {
      "id": ordered[i].id,
      "quantity": 1,
      "order_time": ordered[i].order_time,
    };
    completed.push(foodInfo);
  }

  // however, if the quantity is now 0 in the completed array, remove from the ordered array
  if (ordered[i].quantity === 0) {
    ordered.splice(i, 1);

    // we also have to update the time completed of the specific dish itself
    for (var k in completed) {

      // keep the time in seconds for consistency
      if (completed[k].id === itemID) {
        completed[k].finish_time = (Date.now() / 1000)
      
        // this also requires us to record the food time in the menu array
        const foodItem = doc(db, "menu", itemID);
        const foodData = await getDoc(foodItem);

        const time_recorded = foodData.data()["time"];

        // we add the time it took for the dish to be completed into the food info
        // (finish_time - ordered_time) / quantity
        time_recorded.push(Math.floor((completed[k].finish_time - completed[k].order_time) / completed[k].quantity));

        // update doc now
        await updateDoc(foodItem, {
          "time": time_recorded,
        });
        
      }
      break;
    }
  }

  // now we can update the file
  await updateDoc(docRef, {
    "food_completed": completed,
    "food_ordered": ordered
  });

  // check if ordered is empty, then we move the order to order history and delete from current directory
  if (ordered.length === 0) {
    const orderHist = doc(db, "orders", orderID);
    const docData = await getDoc(orderHist);

    // since we need to adjust time finished, we create a new variable
    // create a time in seconds
    const newOrder = docData.data();
    newOrder["time_finished"] = Math.floor(Date.now() / 1000);

    // replace into order history collection
    await setDoc(doc(db, "ordersHist", orderID), newOrder);

    // now delete from current orders
    await deleteDoc(orderHist);

  }

}




