import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyDdAIpAHdv_gQctDGkhLYdm5UVFZ1XnAWs",
  authDomain: "event-arrangement.firebaseapp.com",
  databaseURL: "https://event-arrangement-default-rtdb.firebaseio.com",
  projectId: "event-arrangement",
  storageBucket: "event-arrangement.appspot.com",
  messagingSenderId: "761559962786",
  appId: "1:761559962786:web:5ac7c2cda4549942dd73fb",
  measurementId: "G-1QRD6SFNT5",
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
