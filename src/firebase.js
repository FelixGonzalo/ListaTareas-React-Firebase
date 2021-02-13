import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    /*tu firebaseConfig here */
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}