import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC74z-bKhRy6t6Od7152u7khL7h9gdWfQk",
    authDomain: "linkedin-clone-d9183.firebaseapp.com",
    projectId: "linkedin-clone-d9183",
    storageBucket: "linkedin-clone-d9183.appspot.com",
    messagingSenderId: "980023762428",
    appId: "1:980023762428:web:b1a24ac5eb6cacb4a72679",
    measurementId: "G-B4BG4FHZEX"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {db,auth};