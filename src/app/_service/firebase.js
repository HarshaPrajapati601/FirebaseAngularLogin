import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAyqsOOBzXf-Bb5XN-e6sLilWlw-W5zLy0",
    authDomain: "angular-firebase-auth-7a3c1.firebaseapp.com",
    databaseURL: "https://angular-firebase-auth-7a3c1.firebaseio.com",
    projectId: "angular-firebase-auth-7a3c1",
    storageBucket: "angular-firebase-auth-7a3c1.appspot.com",
    messagingSenderId: "828664262021",
    appId: "1:828664262021:web:443651f730795de994e8ec",
    measurementId: "G-YXVL8RMST8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };