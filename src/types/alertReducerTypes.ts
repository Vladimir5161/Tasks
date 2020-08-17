export interface setAlertClassTypes {
    type: "SETALERTCLASS",
    alertClass: string,
}
export interface setConfirmTypes {
    type: "SETCONFIRM",
    confirm: boolean,
    id?: number,
    key?: string
}
export interface toDefaultMessageTypes {
    type: "SETDEFAULTMESSAGE"
}
export interface setTaskPanelTypes {
    type: "SETTASKPANEL",
    id: number
}
export interface SetMessageTypes {
    type: "SETMESSAGE",
    message: string,
    types: string,
}