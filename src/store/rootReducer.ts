import { combineReducers } from "redux";
import TaskReducer from "./TaskReducer";
import AuthReducer from "./AuthReducer";
import AlertReducer from "./AlertReducer";
import AuthorizationReducer from "./AuthorizationReducer";

const rootReducer = combineReducers({
    tasks: TaskReducer,
    auth: AuthReducer,
    alert: AlertReducer,
    authorized: AuthorizationReducer,
});

type rootReducerType = typeof rootReducer
export type AppStoreReducer = ReturnType<rootReducerType>

export default rootReducer;
