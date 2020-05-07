import * as axios from "axios";
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
const auth = app.auth();
const instance = axios.create({
    baseURL: "https://tasks-project-12af2.firebaseio.com/",
    withCreadentials: true,
    headers: {
        key: `AAAAJUvgKzw:APA91bHdyP_suyOtAoCKDSBRs2LQD7VJ0LpVeG7nhkN8suDHw2gAb5ilZ3ZIilugqGTBHLOeHr7cbeSG2auxl95pSI8_nM3NWf9iYyhu3y4BPkTZqozcYqa_NoR4ICkaLHOZGkv55Gsk`,
    },
});
export const WebApi = {
    getTasks() {
        return instance.get(`tasks.json`).then((resp) => {
            return resp.data;
        });
    },
    getTaskItem(keyFirebase) {
        return instance.get(`tasks/${keyFirebase}.json`).then((resp) => {
            return resp.data;
        });
    },
    addTask(task) {
        return instance.post(`tasks.json`, task).then((resp) => {
            return resp.data;
        });
    },
    deleteTask(keyFirebase) {
        return instance.delete(`tasks/${keyFirebase}.json`).then((resp) => {
            return resp.data;
        });
    },
    updateTask(task) {
        return instance
            .put(`tasks/${task.keyFirebase}.json`, task)
            .then((resp) => {
                return resp.data;
            });
    },
    login(email, password) {
        return app
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === "auth/weak-password") {
                    alert("The password is too weak.");
                } else {
                    alert(errorMessage);
                }
            });
    },
};
