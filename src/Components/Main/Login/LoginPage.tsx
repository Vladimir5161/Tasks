import React, { useState } from "react";
import "./login.scss";
import LoginForm from "../../FormControls/LoginForm";
import CreateUserForm from "../../FormControls/CreateUserForm";
import { connect } from "react-redux";
import { CreateAccount, Login, AuthUser } from "../../../store/AuthReducer";
import { validateLogin } from "../../../validators/validators";
import { AppStoreReducer } from "../../../store/rootReducer";

interface LoginPageType {
    CreateAccount: (email: string, password: string, userName: string) => void;
    Login: (email: string, password: string) => Promise<void>;
    AuthUser: () => void;
    isAuth: boolean;
    BlockedButtonArray: Array<number | string>;
}
const LoginPage: React.FC<LoginPageType> = ({
    CreateAccount,
    Login,
    AuthUser,
    isAuth,
    BlockedButtonArray,
}) => {
    let [createUser, setCreateUser] = useState(false);
    const changePage = () => {
        createUser ? setCreateUser(false) : setCreateUser(true);
    };
    const onSubmit = (form: {
        email: string;
        password: string;
        userName: string;
    }) => {
        CreateAccount(form.email, form.password, form.userName);
    };
    const onSubmitLogin = (form: { email: string; password: string }) => {
        Login(form.email, form.password).then(() => AuthUser());
    };
    return (
        <div className="loginPage">
            {createUser && isAuth ? (
                <CreateUserForm
                    changePage={changePage}
                    BlockedButtonArray={BlockedButtonArray}
                    initialValues={{ password: "", email: "", userName: "" }}
                    functionToCall={onSubmit}
                    validate={validateLogin}
                />
            ) : !createUser ? (
                <LoginForm
                    changePage={changePage}
                    functionToCall={onSubmitLogin}
                    BlockedButtonArray={BlockedButtonArray}
                    initialValues={{ password: "", email: "", userName: "" }}
                    validate={validateLogin}
                />
            ) : (
                <CreateUserForm
                    changePage={changePage}
                    functionToCall={onSubmit}
                    BlockedButtonArray={BlockedButtonArray}
                    initialValues={{ password: "", email: "", userName: "" }}
                    validate={validateLogin}
                />
            )}
        </div>
    );
};
const mapStateToProps = (state: AppStoreReducer) => ({
    isAuth: state.auth.isAuth,
    BlockedButtonArray: state.tasks.BlockedButtonArray,
});
export default connect(mapStateToProps, { CreateAccount, Login, AuthUser })(
    LoginPage
);
