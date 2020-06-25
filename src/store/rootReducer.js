import { combineReducers } from "redux";
import TaskReducer from "./TaskReducer";
import { reducer as formReducer } from "redux-form";
import AuthReducer from "./AuthReducer";
import AlertReducer from "./AlertReducer";
import AuthorizationReducer from "./AuthorizationReducer";

const rootReducer = combineReducers({
    tasks: TaskReducer,
    form: formReducer,
    auth: AuthReducer,
    alert: AlertReducer,
    authorized: AuthorizationReducer,
});

export default rootReducer;
