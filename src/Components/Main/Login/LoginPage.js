import React, { useState } from "react";
import "./login.css";
import LoginForm from "../../FormControls/LoginForm";
import CreateUserForm from "../../FormControls/CreateUserForm.js";
import { connect } from "react-redux";
import { CreateAccount, Login } from "../../../store/TaskReducer";

const LoginPage = ({ CreateAccount, Login }) => {
    let [createUser, setCreateUser] = useState(false);
    const changePage = () => {
        createUser ? setCreateUser(false) : setCreateUser(true);
    };
    const onSubmit = (form) => {
        CreateAccount(form.email, form.password);
    };
    const onSubmitLogin = (form) => {
        Login(form.email, form.password);
    };
    return (
        <div className="loginPage">
            {createUser ? (
                <CreateUserForm changePage={changePage} onSubmit={onSubmit} />
            ) : (
                <LoginForm changePage={changePage} onSubmit={onSubmitLogin} />
            )}
        </div>
    );
};

export default connect(null, { CreateAccount, Login })(LoginPage);
