
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCO5NB3InhfjklQyBUvBfCA6WYnvRmMhZ0",
    authDomain: "whatsapp-clone-58165.firebaseapp.com",
    projectId: "whatsapp-clone-58165",
    storageBucket: "whatsapp-clone-58165.appspot.com",
    messagingSenderId: "765127317242",
    appId: "1:765127317242:web:b0892da6ea5971160d9b43",
    measurementId: "G-ZFW222X65Y"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;