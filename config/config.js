var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccount2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fuerzamex-bkn-default-rtdb.firebaseio.com"
  });

const firebase = require('firebase');
const { database } = require("firebase-admin");
var firebaseConfig = {
    apiKey: "AIzaSyDWwtnqy8ioXhzJT1k_t0jrvEnJUZIMads",
    authDomain: "fuerzamex-bkn.firebaseapp.com",
    projectId: "fuerzamex-bkn",
    storageBucket: "fuerzamex-bkn.appspot.com",
    messagingSenderId: "220343218573",
    appId: "1:220343218573:web:3988227f39074abd130dc4",
    measurementId: "G-DSXC4VM4RM"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);