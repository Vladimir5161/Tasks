import app from "./firebase";

export const WebApi = {
    createAcc(email: string, password: string) {
        return app.auth().createUserWithEmailAndPassword(email, password);
    },
    login(email: string, password: string) {
        return app.auth().signInWithEmailAndPassword(email, password);
    },
    logout() {
        return app.auth().signOut();
    },
};
