export interface setUserNameAndIdTypes {
    type: "SETUSERNAME";
    name: string;
    userId: string;
}
export interface userTypes {
    name: string;
    userId: string;
}
export interface setAuthTypes {
    type: "ISAUTH";
    authStatus: boolean;
}
