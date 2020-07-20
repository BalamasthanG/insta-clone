import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCv4aH583CBvIm-n4C7vRgkzcNIug_ZyYA",
  authDomain: "insta-clone-78bfd.firebaseapp.com",
  databaseURL: "https://insta-clone-78bfd.firebaseio.com",
  projectId: "insta-clone-78bfd",
  storageBucket: "insta-clone-78bfd.appspot.com",
  messagingSenderId: "275109741276",
  appId: "1:275109741276:web:3ec53953d3232607a9aa19",
  measurementId: "G-PVS3BGC34H",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
