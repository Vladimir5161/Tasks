import { GetTasksThunk } from "./TaskReducer";

const initialState = {
    Authorized: false,
};

const AuthorizationReducer = (state = initialState, action) => {
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
export const Autorization = (status) => ({ type: "SETAUTHORIZED", status });


// getting main data for the app and then setting authorized to "true", and showing data to a user by this action
export const AuthorizationThunk = () => async (dispatch) => {
    await dispatch(GetTasksThunk());
    dispatch(Autorization(true));
};

export default AuthorizationReducer;
