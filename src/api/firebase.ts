import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDDCu8aVuHiB7D0oEGNqf93tNk1tCav9GQ",
    authDomain: "tasks-project-12af2.firebaseapp.com",
    databaseURL: "https://tasks-project-12af2.firebaseio.com",
    projectId: "tasks-project-12af2",
    storageBucket: "tasks-project-12af2.appspot.com",
    messagingSenderId: "160186772284",
    appId: "1:160186772284:web:b6f12a604740d28b8c0c39",
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

export default app;
