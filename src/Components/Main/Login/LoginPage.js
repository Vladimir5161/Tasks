import React, { useState } from "react";
import "./login.css";
import LoginForm from "../../FormControls/LoginForm";
import CreateUserForm from "../../FormControls/CreateUserForm.js";
import { connect } from "react-redux";
import { CreateAccount, Login, AuthUser } from "../../../store/AuthReducer";

const LoginPage = ({ CreateAccount, Login, AuthUser, isAuth }) => {
    let [createUser, setCreateUser] = useState(false);
    const changePage = () => {
        createUser ? setCreateUser(false) : setCreateUser(true);
    };
    const onSubmit = (form) => {
        CreateAccount(form.email, form.password);
    };
    const onSubmitLogin = (form) => {
        Login(form.email, form.password).then(() => AuthUser());
    };
    return (
        <div className="loginPage">
            {createUser && isAuth ? (
                <CreateUserForm changePage={changePage} onSubmit={onSubmit} />
            ) : isAuth ? (
                <CreateUserForm changePage={changePage} onSubmit={onSubmit} />
            ) : createUser ? (
                <CreateUserForm changePage={changePage} onSubmit={onSubmit} />
            ) : (
                <LoginForm changePage={changePage} onSubmit={onSubmitLogin} />
            )}
        </div>
    );
};
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { CreateAccount, Login, AuthUser })(
    LoginPage
);
