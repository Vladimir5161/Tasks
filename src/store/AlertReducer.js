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

// this runs when the alert modalis closing and it set "alertContainer" class to show and run animation
export const setAlertClass = (alertClass) => ({
    type: "SETALERTCLASS",
    alertClass,
});

// here we are setting message text to null and hiding alert modal
export const DefaultMessage = () => async (dispatch, getState) => {
    if (getState().alert.alertClass !== "alertNone") {
        dispatch(setAlertClass("alertContainer"));
        setTimeout(() => {
            dispatch(toDefaultMessage());
        }, 1000);
    } else return null;
};

export default AlertReducer;
