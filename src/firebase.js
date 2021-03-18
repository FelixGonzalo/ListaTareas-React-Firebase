import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    /*tu firebaseConfig here */

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dataBase = firebase.firestore()
const auth = firebase.auth()

export {dataBase, auth}