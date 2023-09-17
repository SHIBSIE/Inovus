import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyAP2mFFzEOIGN0lE5LORCoY00bwFCRug4k",
    authDomain: "inovus-ee241.firebaseapp.com",
    databaseURL: "https://inovus-ee241-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "inovus-ee241",
    storageBucket: "inovus-ee241.appspot.com",
    messagingSenderId: "116522124361",
    appId: "1:116522124361:web:e0e95890833569882eeb98"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};