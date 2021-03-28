import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAlgnBlBdDXS1H9Ab33mv2yejls2pUcVno",
  authDomain: "where-s-waldo-f43eb.firebaseapp.com",
  projectId: "where-s-waldo-f43eb",
  storageBucket: "where-s-waldo-f43eb.appspot.com",
  messagingSenderId: "922620003798",
  appId: "1:922620003798:web:a9ca1103f42f04a92a9077",
  measurementId: "G-P7SHKE59Z2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { firestore, timestamp };
