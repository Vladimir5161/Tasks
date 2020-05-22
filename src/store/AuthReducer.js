import { WebApi } from "../api/api";
import app from "../api/firebase";
import { reset } from "redux-form";
import { SetMessage, DefaultMessage } from "./AlertReducer";
import { blockButton } from "./TaskReducer";

const initialState = {
    isAuth: false,
    user: {
        name: null,
    },
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ISAUTH":
            return { ...state, isAuth: (state.isAuth = action.authStatus) };
        case "SETUSERNAME":
            return {
                ...state,
                user:
                    action.email !== "null"
                        ? { ...state.user, name: action.email }
                        : { ...state.user, name: null },
            };
        default:
            return state;
    }
};

export const setAuth = (authStatus) => ({ type: "ISAUTH", authStatus });
export const setUserName = (email) => ({ type: "SETUSERNAME", email });

export const CreateAccount = (email, password, userName) => async (
    dispatch
) => {
    await dispatch(blockButton("createUser"));
    try {
        await WebApi.createAcc(email, password).then((data) => {
            return app
                .firestore()
                .collection("users")
                .doc(data.user.uid)
                .set({ userId: data.user.uid, userName: userName })
                .then(
                    dispatch(
                        SetMessage("your acccount has been created", "success")
                    )
                );
        });
        dispatch(reset("createUserForm"));
    } catch (error) {
        dispatch(SetMessage(error.message, "error"));
    }
    dispatch(blockButton("createUser"));
};
export const Login = (email, password) => async (dispatch) => {
    await dispatch(blockButton("login"));
    try {
        let responce = await WebApi.login(email, password);
        await dispatch(reset("loginForm"));

        if (responce.user !== undefined) {
            app.auth().onAuthStateChanged(async (user) => {
                if (user) {
                    await app
                        .firestore()
                        .collection("users")
                        .doc(user.uid)
                        .get()
                        .then((querySnapshot) => {
                            dispatch(setAuth(true));
                            dispatch(
                                setUserName(querySnapshot.data().userName)
                            );
                            dispatch(
                                SetMessage(
                                    `Hello ${
                                        querySnapshot.data().userName
                                    } you are logged in`,
                                    "success"
                                )
                            );
                        });
                } else {
                    dispatch(setAuth(false));
                    dispatch(setUserName("null"));
                }
            });
        }
    } catch (error) {
        debugger;
        dispatch(SetMessage(error.message, "error"));
        dispatch(reset("loginForm"));
    }
    dispatch(blockButton("login"));
};

export const AuthUser = () => async (dispatch) => {
    app.auth().onAuthStateChanged(async (user) => {
        if (user) {
            await app
                .firestore()
                .collection("users")
                .doc(user.uid)
                .get()
                .then((querySnapshot) => {
                    dispatch(setAuth(true));
                    dispatch(setUserName(querySnapshot.data().userName));
                });
        } else {
            dispatch(setAuth(false));
            dispatch(setUserName("null"));
        }
    });
};

export const Logout = () => async (dispatch) => {
    await dispatch(blockButton("login"));
    try {
        await WebApi.logout();
        dispatch(SetMessage("you are logged out", "success"));
    } catch (error) {
        dispatch(SetMessage(error.message, "error"));
    }
    dispatch(blockButton("login"));
};

export default AuthReducer;
