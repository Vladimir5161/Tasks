import app from "./firebase";

export const WebApi = {
    createAcc(email, password) {
        return app.auth().createUserWithEmailAndPassword(email, password);
    },
    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password);
    },
    logout() {
        return app.auth().signOut();
    },
};
