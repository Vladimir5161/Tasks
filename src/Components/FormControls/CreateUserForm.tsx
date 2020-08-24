import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ChangePageButton from "../CommonComponents/ChangePageButton";
import { FormHOC } from "../HOC/formHOC";
import { connect } from "react-redux";
import { compose } from "redux";
import ErrorValidate from "../CommonComponents/ErrorValidate";
import { TextField } from "@material-ui/core";
import ErrorValidatePass from "../CommonComponents/ErrorValidatePass";
import Checkbox from "../CommonComponents/Checkbox";
import { AppStoreReducer } from "../../store/rootReducer";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}));

interface CreateUserFormTypes {
    formik: any;
    changePage: () => void;
    BlockedButtonArray: Array<number | string>;
    label: any;
    type: any;
}

const CreateUserForm: React.FC<CreateUserFormTypes> = ({
    formik,
    changePage,
    BlockedButtonArray,
}) => {
    const classes: any = useStyles();
    const [state, setState] = React.useState({
        showPass: false,
    });
    return (
        <form
            className="loginForm"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
        >
            <div style={{ display: "flex", justifyContent: "center" }}>
                Here You can create a new account
            </div>
            <div className="inputTaskDiv">
                {formik.errors.email ? (
                    <ErrorValidate
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        label="email"
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
                        />
                    </div>
                )}
                <div style={{ position: "relative" }}>
                    <Checkbox setState={setState} state={state} />
                    {formik.errors.password ? (
                        <ErrorValidatePass
                            label={formik.errors.password}
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            state={state}
                        />
                    ) : (
                        <div className="formBlock">
                            <TextField
                                label="password"
                                type={state.showPass ? "text" : "password"}
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                autoFocus={true}
                            />
                        </div>
                    )}
                </div>
                {formik.errors.name ? (
                    <ErrorValidate
                        name="userName"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        label={formik.errors.userName}
                    />
                ) : (
                    <div className="formBlock">
                        <TextField
                            label="User Name"
                            type="text"
                            name="userName"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            autoFocus={true}
                        />
                    </div>
                )}
            </div>
            <ChangePageButton buttonName="Log in" changePage={changePage} />
            <Button
                type="submit"
                style={{ margin: "20px auto" }}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<CloudUploadIcon />}
                disabled={BlockedButtonArray.some((id) => id === "createUser")}
            >
                Send
            </Button>
        </form>
    );
};

const mapStateToProps = (state: AppStoreReducer) => ({
    isAuth: state.auth.isAuth,
});

export default compose(FormHOC)(connect(mapStateToProps)(CreateUserForm));
