import React, { useState } from "react";
import "./login.scss";
import LoginForm from "../../FormControls/LoginForm";
import CreateUserForm from "../../FormControls/CreateUserForm.js";
import { connect } from "react-redux";
import { CreateAccount, Login, AuthUser } from "../../../store/AuthReducer";

const LoginPage = ({
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
    const onSubmit = (form) => {
        CreateAccount(form.email, form.password, form.userName);
    };
    const onSubmitLogin = (form) => {
        Login(form.email, form.password).then(() => AuthUser());
    };
    return (
        <div className="loginPage">
            {createUser && isAuth ? (
                <CreateUserForm
                    changePage={changePage}
                    onSubmit={onSubmit}
                    BlockedButtonArray={BlockedButtonArray}
                />
            ) : isAuth ? (
                <CreateUserForm
                    changePage={changePage}
                    onSubmit={onSubmit}
                    BlockedButtonArray={BlockedButtonArray}
                />
            ) : createUser ? (
                <CreateUserForm
                    changePage={changePage}
                    onSubmit={onSubmit}
                    BlockedButtonArray={BlockedButtonArray}
                />
            ) : (
                            <LoginForm
                                changePage={changePage}
                                onSubmit={onSubmitLogin}
                                BlockedButtonArray={BlockedButtonArray}
                            />
                        )}
        </div>
    );
};
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    BlockedButtonArray: state.tasks.BlockedButtonArray,
});
export default connect(mapStateToProps, { CreateAccount, Login, AuthUser })(
    LoginPage
);
