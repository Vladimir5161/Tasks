import { combineReducers } from "redux";
import TaskReducer from "./TaskReducer";

const rootReducer = combineReducers({ tasks: TaskReducer });

export default rootReducer;
