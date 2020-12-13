import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyAV35bA4ro1CSUidPpasjhOkqJeyWCkFpU",
  authDomain: "quizlet-clone-2aff0.firebaseapp.com",
  databaseURL: "https://quizlet-clone-2aff0.firebaseio.com",
  projectId: "quizlet-clone-2aff0",
  storageBucket: "quizlet-clone-2aff0.appspot.com",
  messagingSenderId: "111281728622",
  appId: "1:111281728622:web:5e6129de3f3d19f8ea8a7f",
  measurementId: "G-HPJ32VTBTN",
});
export const provider = new firebase.auth.GoogleAuthProvider();

