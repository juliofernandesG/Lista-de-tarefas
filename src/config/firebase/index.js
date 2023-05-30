import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyA_a4bO3BIfA-UWckYIRs49q0qUOCcjI1Y",
  authDomain: "desenvolvimentowebcomreact.firebaseapp.com",
  projectId: "desenvolvimentowebcomreact",
  storageBucket: "desenvolvimentowebcomreact.appspot.com",
  messagingSenderId: "26264035536",
  appId: "1:26264035536:web:0da61df43ee14b6eec3ed5",
  measurementId: "G-QXPK1RRNMQ",
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
