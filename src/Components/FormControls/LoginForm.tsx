import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ChangePageButton from "../CommonComponents/ChangePageButton";
import ErrorValidate from "../CommonComponents/ErrorValidate";
import { TextField } from "@material-ui/core";
import ErrorValidatePass from "../CommonComponents/ErrorValidatePass";
import Checkbox from "../CommonComponents/Checkbox";
import { FormHOC } from "../HOC/formHOC";
import { compose } from "redux";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "90%",
        },
    },
}));

interface LoginFormTypes {
    formik: any;
    changePage: () => void;
    BlockedButtonArray: Array<number | string>;
    setCreateOrLog: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormTypes> = ({
    formik,
    changePage,
    BlockedButtonArray,
    setCreateOrLog,
}) => {
    const [state, setState] = React.useState({
        showPass: false,
    });
    const classes: any = useStyles();
    return (
        <form className="loginForm" onSubmit={formik.handleSubmit}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                Log in
            </div>
            <div className="inputTaskDiv">
                {formik.errors.email ? (
                    <ErrorValidate
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        label={formik.errors.email}
                    />
                ) : (
                    <div className="formBlock">
                        <TextField
                            label="email"
                            type="text"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            autoFocus={true}
                            className="loginField"
                        />
                    </div>
                )}
                <div style={{ position: "relative" }}>
                    {formik.errors.password ? (
                        <div className="formBlock">
                            <Checkbox setState={setState} state={state} />
                            <ErrorValidatePass
                                label={formik.errors.password}
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                state={state}
                            />
                        </div>
                    ) : (
                        <div className="formBlock">
                            <Checkbox setState={setState} state={state} />
                            <TextField
                                label="password"
                                type={state.showPass ? "text" : "password"}
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                autoFocus={true}
                                className="passField"
                            />
                        </div>
                    )}
                </div>
            </div>
            <ChangePageButton
                buttonName="Create Account"
                changePage={changePage}
                setCreateOrLog={setCreateOrLog}
            />
            <Button
                type="submit"
                style={{ margin: "0 auto" }}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<CloudUploadIcon />}
                disabled={BlockedButtonArray.some((id) => id === "login")}
            >
                Send
            </Button>
        </form>
    );
};

export default compose(FormHOC)(LoginForm);
