import firebase from 'firebase';

// Initialize Firebase
  const config = {
    apiKey: "AIzaSyDYjk__kVG_ISxWMSF4Q9XRYqyzyCgSDhU",
    authDomain: "authentication-71403.firebaseapp.com",
    databaseURL: "https://authentication-71403.firebaseio.com",
    projectId: "authentication-71403",
    storageBucket: "authentication-71403.appspot.com",
    messagingSenderId: "981202444879"
  };
  firebase.initializeApp(config);

const database = firebase.database();

const auth = firebase.auth();
export {
  database,
  auth
};
