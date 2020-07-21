import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDRJPZlhIfdSOyYHMjHxfCbd8w20Imy6rI",
  authDomain: "insta-clone-486d0.firebaseapp.com",
  databaseURL: "https://insta-clone-486d0.firebaseio.com",
  projectId: "insta-clone-486d0",
  storageBucket: "insta-clone-486d0.appspot.com",
  messagingSenderId: "187197945067",
  appId: "1:187197945067:web:a03d9bda29dbe11fc57aae",
  measurementId: "G-QL62JD44MC",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
