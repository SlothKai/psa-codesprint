// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCYoEsTP1jDmpSHxzhUPF65EHmDZDJOO-0",
  authDomain: "psacodespring---hrgen2.firebaseapp.com",
  projectId: "psacodespring---hrgen2",
  storageBucket: "psacodespring---hrgen2.appspot.com",
  messagingSenderId: "74815053878",
  appId: "1:74815053878:web:3f715a1df7986641d2f897",
  measurementId: "G-TLWX15M6M2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection('Employees');

module.exports = User;


