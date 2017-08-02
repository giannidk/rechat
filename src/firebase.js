import firebase from 'firebase';

// Initialize Firebase
  const config = {
    apiKey: "AIzaSyB2-iMgiGCfSBOrokOn4kovBnqEQWX7D4k",
    authDomain: "rechat-f7973.firebaseapp.com",
    databaseURL: "https://rechat-f7973.firebaseio.com",
    projectId: "rechat-f7973",
    storageBucket: "",
    messagingSenderId: "1059192181205"
  };
  firebase.initializeApp(config);

const database = firebase.database();

const auth = firebase.auth();
export {
  database,
  auth
};
