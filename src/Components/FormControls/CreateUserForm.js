import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { createField, InputForm, InputFormPass } from "./Field";
import { reduxForm } from "redux-form";
import ChangePageButton from "../CommonComponents/ChangePageButton";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}));

function CreateUser({ changePage, isAuth, ...props }) {
    const classes = useStyles();
    console.log(isAuth);
    return (
        <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={props.handleSubmit}
        >
            {createField("email", "email", [], InputForm, {
                inputLabel: "write your email",
            })}
            {createField("password", "password", [], InputFormPass, {
                inputLabel: "create password",
            })}
            {isAuth ? null : (
                <ChangePageButton buttonName="Login" changePage={changePage} />
            )}
            <Button
                type="submit"
                style={{ margin: "0 auto" }}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<CloudUploadIcon />}
            >
                Send
            </Button>
        </form>
    );
}
const CreateUserForm = reduxForm({ form: "createUserForm" })(CreateUser);
const mapStateToProps = (state) => ({
    isAuth: state.tasks.isAuth,
});
export default connect(mapStateToProps)(CreateUserForm);
