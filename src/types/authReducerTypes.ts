export interface setUserNameAndIdTypes {
    type: "SETUSERNAME",
    name: string | null,
    userId: string | null,
}
export interface userTypes {
    name: string | null,
    userId: string | null

}
export interface setAuthTypes {
    type: "ISAUTH",
    authStatus: boolean
}
