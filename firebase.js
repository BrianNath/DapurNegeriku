import firebase from "firebase/compat/";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCxdTXKouj7JaiAZE7XT1YT9P5hP30gVYQ",
    authDomain: "dapurnegeriku.firebaseapp.com",
    databaseURL: "https://dapurnegeriku-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dapurnegeriku",
    storageBucket: "dapurnegeriku.appspot.com",
    messagingSenderId: "331704734990",
    appId: "1:331704734990:web:d699e9c22122fa74c3335f"
  };
  
// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const auth = firebase.auth()

// "https://dapurnegeriku-default-rtdb.asia-southeast1.firebasedatabase.app";
const database = app.database()


export { auth, database }