import { combineReducers } from "redux";
import TaskReducer from "./TaskReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({ tasks: TaskReducer, form: formReducer });

export default rootReducer;
