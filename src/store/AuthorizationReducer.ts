import { GetTasksThunk, ActionTaskTypes } from "./TaskReducer";
import { Dispatch } from "redux";
import { AppStoreReducer } from "./rootReducer";

export interface InitialStateType {
    Authorized: boolean;
}
const initialState: InitialStateType = {
    Authorized: false,
};
type InitialState = typeof initialState;

const AuthorizationReducer = (
    state: InitialState = initialState,
    action: ActionAuthorizationType
): InitialState => {
    switch (action.type) {
        case "SETAUTHORIZED":
            return {
                ...state,
                Authorized: (state.Authorized = action.status),
            };
        default:
            return state;
    }
};
export const Autorization = (status: boolean): AutorizationTypes => ({
    type: "SETAUTHORIZED",
    status,
});
export interface AutorizationTypes {
    type: "SETAUTHORIZED";
    status: boolean;
}
type ActionAuthorizationType = AutorizationTypes;
type DispatchType = Dispatch<ActionAuthorizationType | ActionTaskTypes>;

// getting main data for the app and then setting authorized to "true", and showing data to a user by this action
export const AuthorizationThunk = (): any => async (
    dispatch: DispatchType,
    getState: () => AppStoreReducer
) => {
    const isAuth = getState().auth.isAuth;
    if (isAuth) {
        await dispatch(GetTasksThunk());
        dispatch(Autorization(true));
    } else {
        dispatch(Autorization(true));
    }
};

export default AuthorizationReducer;
