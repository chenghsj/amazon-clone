import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDfZEmrGulF29Y5wDwW2qJEPOS-tDE4zCY",
  authDomain: "clone-33ba1.firebaseapp.com",
  databaseURL: "https://clone-33ba1.firebaseio.com",
  projectId: "clone-33ba1",
  storageBucket: "clone-33ba1.appspot.com",
  messagingSenderId: "283479586617",
  appId: "1:283479586617:web:4c8224b4d3f824ba8c5ae8",
  measurementId: "G-FJTLB98RNS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
