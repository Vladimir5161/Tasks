import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { createField, InputForm, InputFormPass } from "./Field";
import { reduxForm } from "redux-form";
import ChangePageButton from "../CommonComponents/ChangePageButton";
import { connect } from "react-redux";
import {
    minLength,
    required,
    includesNumbers,
} from "../../validators/validators";

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
    return (
        <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={props.handleSubmit}
        >
            <div style={{ display: "flex", justifyContent: "center" }}>
                Here You can create an account
            </div>
            {createField("email", "email", [required, minLength], InputForm, {
                inputLabel: "write your email",
            })}
            {createField(
                "password",
                "password",
                [required, minLength, includesNumbers],
                InputFormPass,
                {
                    inputLabel: "create password",
                }
            )}
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
    isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps)(CreateUserForm);
