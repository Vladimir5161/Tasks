export interface setUserNameAndIdTypes {
    type: "SETUSERNAME";
    name: string;
    userId: string;
    email: string
}
export interface userTypes {
    name: string;
    userId: string;
    email: string
}
export interface setAuthTypes {
    type: "ISAUTH";
    authStatus: boolean;
}
