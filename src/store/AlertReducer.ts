import { Dispatch } from "redux";
import { AppStoreReducer } from "./rootReducer";
import { setAlertClassTypes, setConfirmTypes, toDefaultMessageTypes, SetMessageTypes, setTaskPanelTypes } from "../types/alertReducerTypes";
import { ID } from "../types/types";

export interface InitialStateType {
    message: string,
    type: string,
    alertClass: string,
    confirm: boolean,
    deleteId: number | null,
    deleteKey?: string | null,
    taskPanel: Array<any>,
}

const initialState: InitialStateType = {
    message: "",
    type: "success",
    alertClass: "alertNone",
    confirm: false,
    deleteId: null,
    deleteKey: null,
    taskPanel: []
};
type InitialState = typeof initialState

const AlertReducer = (state: InitialState = initialState, action: ActionAlertTypes): InitialState => {
    switch (action.type) {
        case "SETMESSAGE":
            return {
                ...state,
                message: (state.message = action.message),
                type: (state.type = action.types),
                alertClass: (state.alertClass = "alertContainerFirst"),
            };
        case "SETDEFAULTMESSAGE":
            return {
                ...state,
                message: (state.message = ""),
                type: (state.type = "success"),
                alertClass: (state.alertClass = "alertNone"),
            };
        case "SETALERTCLASS": {
            return {
                ...state,
                alertClass: (state.alertClass = action.alertClass),
            };
        }
        case "SETCONFIRM":
            return {
                ...state,
                confirm: state.confirm = action.confirm,
                deleteId: state.deleteId = action.id ? action.id : null,
                deleteKey: state.deleteKey = action.key ? action.key : null
            }
        case "SETTASKPANEL":
            return {
                ...state,
                taskPanel: state.taskPanel.some(id => id === action.id) ? state.taskPanel.filter(id => id !== action.id) : [...state.taskPanel, action.id]
            }
        default:
            return state;
    }
};

export type ActionAlertTypes = setAlertClassTypes | setConfirmTypes | toDefaultMessageTypes | setTaskPanelTypes | SetMessageTypes
type DispatchType = Dispatch<ActionAlertTypes>

export const SetMessage: any = (message: string, types: string): SetMessageTypes => ({
    type: "SETMESSAGE",
    message,
    types,
});

export const setTaskPanel = (id: number): setTaskPanelTypes => ({ type: "SETTASKPANEL", id })


export const toDefaultMessage = (): toDefaultMessageTypes => ({ type: "SETDEFAULTMESSAGE" });



export const setConfirm = (confirm: boolean, id?: number, key?: string): setConfirmTypes => ({ type: "SETCONFIRM", confirm, id, key })


// this runs when the alert modalis closing and it set "alertContainer" class to show and run animation
export const setAlertClass = (alertClass: string): setAlertClassTypes => ({
    type: "SETALERTCLASS",
    alertClass,
});


// here we are setting message text to null and hiding alert modal
export const DefaultMessage = () => async (dispatch: DispatchType, getState: () => AppStoreReducer) => {
    if (getState().alert.alertClass !== "alertNone") {
        dispatch(setAlertClass("alertContainer"));
        setTimeout(() => {
            dispatch(toDefaultMessage());
        }, 1000);
    } else return null;
};


export default AlertReducer;
