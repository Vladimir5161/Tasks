const initialState = {
    message: null,
    type: "success",
    alertClass: "alertNone",
};

const AlertReducer = (state = initialState, action) => {
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
                message: (state.message = null),
                type: (state.type = "success"),
                alertClass: (state.alertClass = "alertNone"),
            };
        case "SETALERTCLASS": {
            return {
                ...state,
                alertClass: (state.alertClass = action.alertClass),
            };
        }
        default:
            return state;
    }
};

export const SetMessage = (message, types) => ({
    type: "SETMESSAGE",
    message,
    types,
});
export const toDefaultMessage = () => ({ type: "SETDEFAULTMESSAGE" });
export const setAlertClass = (alertClass) => ({
    type: "SETALERTCLASS",
    alertClass,
});
export const DefaultMessage = () => async (dispatch, getState) => {
    if (getState().alert.alertClass !== "alertNone") {
        dispatch(setAlertClass("alertContainer"));
        setTimeout(() => {
            dispatch(toDefaultMessage());
        }, 1000);
    } else return null;
};

export default AlertReducer;
