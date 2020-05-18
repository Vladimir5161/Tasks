import { WebApi } from "../api/api";
import app from "../api/firebase";
import { reset } from "redux-form";
import { SetMessage, DefaultMessage } from "./AlertReducer";

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

export const CreateAccount = (email, password) => async (dispatch) => {
    try {
        await WebApi.createAcc(email, password).then((data) => {
            return app
                .firestore()
                .collection("users")
                .doc(data.user.uid)
                .set({ userId: data.user.uid })
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
};
export const Login = (email, password) => async (dispatch) => {
    try {
        let responce = await WebApi.login(email, password);
        await dispatch(reset("loginForm"));

        if (responce.user !== undefined) {
            dispatch(SetMessage("you are logged in", "success"));
        }
    } catch (error) {
        debugger;
        dispatch(SetMessage(error.message, "error"));
        dispatch(reset("loginForm"));
    }
};

export const AuthUser = () => async (dispatch) => {
    app.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(setAuth(true));
            dispatch(setUserName(user.email));
        } else {
            dispatch(setAuth(false));
            dispatch(setUserName("null"));
        }
    });
};

export const Logout = () => async (dispatch) => {
    try {
        await WebApi.logout();
        dispatch(SetMessage("you are logged out", "success"));
    } catch (error) {
        dispatch(SetMessage(error.message, "error"));
    }
};

export default AuthReducer;
