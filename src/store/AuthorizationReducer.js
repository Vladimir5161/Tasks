import { GetTasksThunk, Loading } from "./TaskReducer";

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

export const AuthorizationThunk = () => async (dispatch) => {
    await dispatch(GetTasksThunk());
    dispatch(Autorization(true));
};

export default AuthorizationReducer;
