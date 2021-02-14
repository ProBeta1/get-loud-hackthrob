import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA4AsJ-VI38rX9VB5pLW0nIxBTGBOreAqs",
    authDomain: "lool-52f06.firebaseapp.com",
    databaseURL: "https://lool-52f06-default-rtdb.firebaseio.com",
    projectId: "lool-52f06",
    storageBucket: "lool-52f06.appspot.com",
    messagingSenderId: "638607488815",
    appId: "1:638607488815:web:daa267becb2c8a3e8913da"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();
export const ft = firebase.firestore();

  