import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    /*tu firebaseConfig here */
    apiKey: "AIzaSyC8pfKUGHaV7IbLI3BNVFLAN_SNc4klO2o",
    authDomain: "crud-react-9d58a.firebaseapp.com",
    projectId: "crud-react-9d58a",
    storageBucket: "crud-react-9d58a.appspot.com",
    messagingSenderId: "155867242994",
    appId: "1:155867242994:web:1538911e506de6d19d8b6b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dataBase = firebase.firestore()
const auth = firebase.auth()

export {dataBase, auth}