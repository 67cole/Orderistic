import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  deleteDoc,
  setDoc
} from "firebase/firestore";

// Reviews Section
// A review is a dictionary containing: {
//    rating: number (a integer from 1-5 that is the review)
//    description: string (a string of the reviews)
// }
// Each review has a name of the customer ID, allowing customers to only make one review of a particular dish

// Given the food ID, return the reviews
export async function returnDishReview(itemID) {
    const q = query(collection(db, "reviews"), where("food_id", "==", itemID));
    const querySnapshot = await getDocs(q);
    const reviewList = [];
    querySnapshot.forEach((doc) => {
        reviewList.push(doc.data());
    });
    return reviewList;
  }
  
// Given the user ID, return the reviews
export async function returnUserReview(userID) {
    const q = query(collection(db, "reviews"), where("user_id", "==", userID));
    const querySnapshot = await getDocs(q);
    const reviewList = [];
    querySnapshot.forEach((doc) => {
        let review = doc.data();
        review.review_id = doc.id;
        reviewList.push(review);
    });
    return reviewList;
  }

// Given the food ID, add the review to the reviews collection
export async function addReview(review) {
    const res = await addDoc(collection(db, 'reviews'), review);
    return res.id;
}

// Add a remove function later!

// Grabbing all review information for front-end purposes
export async function returnReviewData() {
    const docRef = await getDocs(collection(db, "reviews"));
    const reviews = {};

    docRef.forEach((doc) => {
        // object holder so I can alter
        let reviewInfo = doc.data();
        reviews[doc.id] = reviewInfo;
    });
    return reviews;
}

//Allows staff to remove reviews
export async function removeReview(reviewID) {
    const res = await deleteDoc(doc(db, 'reviews', reviewID));
  }

//Allows customers to edit reviews on the menu HIMMY-21
export async function updateReview(reviewID, newReview) {
    const res = await setDoc(doc(db, 'reviews', reviewID), newReview);
}

// Given the food ID, return the dish rating
export async function returnDishRating(itemID) {
  const q = query(collection(db, "reviews"), where("food_id", "==", itemID));
  const querySnapshot = await getDocs(q);
  let totalRating = 0;
  let divisor = 0;
  querySnapshot.forEach((doc) => {
      totalRating += doc.data()["rating"];
      divisor += 1;
  });
  return totalRating/divisor;
}