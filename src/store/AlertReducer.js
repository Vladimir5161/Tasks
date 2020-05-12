const initialState = {
    message: null,
    type: "success",
};

const AlertReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETMESSAGE":
            return {
                ...state,
                message: (state.message = action.message),
                type: (state.type = action.types),
            };
        case "SETDEFAULTMESSAGE":
            return {
                ...state,
                message: (state.message = null),
                type: (state.type = "success"),
            };
        default:
            return state;
    }
};

export const SetMessage = (message, types) => ({
    type: "SETMESSAGE",
    message,
    types,
});
export const DefaultMessage = () => ({ type: "SETDEFAULTMESSAGE" });

export default AlertReducer;
