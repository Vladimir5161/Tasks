import { WebApi } from "../api/api";
import app from "../api/firebase";
import { SetMessage } from "./AlertReducer";
import { blockButton } from "./TaskReducer";
import { Dispatch } from "redux";
import { SetMessageTypes } from "../types/alertReducerTypes";
import { setUserNameAndIdTypes, setAuthTypes } from "../types/authReducerTypes";
import { blockButtonTypes } from "../types/taskReducerTypes";
import { AuthorizationThunk, AutorizationTypes } from "./AuthorizationReducer";

export interface InitialStateType {
    isAuth: boolean;
    user: {
        name: string;
        userId: string;
        email: string
    };
}

const initialState: InitialStateType = {
    isAuth: false,
    user: {
        name: "",
        userId: "",
        email: ""
    },
};
type InitialState = typeof initialState;

const AuthReducer = (
    state: InitialState = initialState,
    action: ActionsAuthTypes
): InitialState => {
    switch (action.type) {
        case "ISAUTH":
            return { ...state, isAuth: (state.isAuth = action.authStatus) };
        case "SETUSERNAME":
            return {
                ...state,
                user:
                    action.name !== ""
                        ? {
                              ...state.user,
                              name: action.name,
                              userId: action.userId,
                              email: action.email
                          }
                        : { ...state.user, name: "", userId: "", email: "" },
            };
        default:
            return state;
    }
};

type ActionsAuthTypes =
    | setAuthTypes
    | setUserNameAndIdTypes
    | SetMessageTypes
    | blockButtonTypes;
type DispatchType = Dispatch<ActionsAuthTypes | AutorizationTypes>;

export const setAuth = (authStatus: boolean): setAuthTypes => ({
    type: "ISAUTH",
    authStatus,
});

export const setUserNameAndId = (
    name: string,
    userId: string,
    email: string
): setUserNameAndIdTypes => ({
    type: "SETUSERNAME",
    name,
    userId,
    email
});

// here we are creating user account, and setting his user name
export const CreateAccount = (
    email: string | null,
    password: string | null,
    userName: string | null
) => async (dispatch: DispatchType) => {
    await dispatch(blockButton("createUser"));
    if(email && password && userName) {
        try {
            await WebApi.createAcc(email, password).then((data: any) => {
                return app
                    .firestore()
                    .collection("users")
                    .doc(data.user.uid)
                    .set({ userId: data.user.uid, userName: userName, email: email })
                    .then(
                        dispatch(
                            SetMessage("your acccount has been created", "success")
                        )
                    );
            });
        } catch (error) {
            dispatch(SetMessage(error.message, "error"));
        }
    } else dispatch(SetMessage("not enough data", "error"));
    dispatch(blockButton("createUser"));
};

//login in on a server and setting user name and id
export const Login = (email: string, password: string) => async (
    dispatch: DispatchType
) => {
    if(email && password) {
        await dispatch(blockButton("login"));
        try {
            let responce = await WebApi.login(email, password);

            if (responce.user !== undefined) {
                app.auth().onAuthStateChanged(async (user) => {
                    if (user) {
                        await app
                            .firestore()
                            .collection("users")
                            .doc(user.uid)
                            .get()
                            .then((querySnapshot: any) => {
                                dispatch(
                                    setUserNameAndId(
                                        querySnapshot.data().userName,
                                        querySnapshot.data().userId,
                                        querySnapshot.data().email
                                    )
                                );

                                dispatch(setAuth(true));
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
                        dispatch(setUserNameAndId("", "", ""));
                    }
                });
            }
        } catch (error) {
            dispatch(SetMessage(error.message, "error"));
        }
    } else dispatch(SetMessage("not enough data", "error"));
    
    dispatch(blockButton("login"));
};

// here we are checking if user is logged in or not
export const AuthUser = () => async (dispatch: DispatchType) => {
    app.auth().onAuthStateChanged(async (user) => {
        if (user) {
            app.firestore()
                .collection("users")
                .doc(user.uid)
                .get()
                .then(async (querySnapshot: any) => {
                    if(querySnapshot.data()) {
                            dispatch(
                            setUserNameAndId(
                                querySnapshot.data().userName,
                                querySnapshot.data().userId,
                                querySnapshot.data().email
                            ));
                            dispatch(setAuth(true));
                            dispatch(AuthorizationThunk());
                    } else { 
                            dispatch(setAuth(false));
                            dispatch(setUserNameAndId("", "", ""));
                            dispatch(AuthorizationThunk());
                            dispatch(SetMessage("seems that you account doesn't exit any more, please create a new one or contact our support",  "error"))
                    }
                });
        } else {
            dispatch(setAuth(false));
            dispatch(setUserNameAndId("", "", ""));
            dispatch(AuthorizationThunk());
        }
    });
};

// loggin out on a server
export const Logout = () => async (dispatch: DispatchType) => {
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
