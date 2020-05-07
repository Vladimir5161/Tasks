const initialState = {
    isAuth: false,
    user: {
        name: "",
        password: "",
        age: "",
    },
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTORIZATION":
            return {
                ...state,
                isAuth: state.isAuth ? false : true,
            };
        case "USERAUTH":
            return {
                ...state,
                user:
                    state.user.name === ""
                        ? {
                              name: action.user.name,
                              password: action.user.password,
                              age: action.user.age,
                          }
                        : state.user ===
                          {
                              name: "",
                              password: "",
                              age: "",
                          },
            };
        default:
            return state;
    }
};
export const Autorization = () => ({ type: "AUTORIZATION" });
export const UserAuth = (user) => ({ type: "USERAUTH", user });

export default AuthReducer;
