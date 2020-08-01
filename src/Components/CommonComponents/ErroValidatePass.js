import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function ErrorValidatePass(props) {
    const classes = useStyles();
    const { input, meta, state, ...restProps } = props;
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    error
                    type={state.showPass ? "text" : "password"}
                    id="standard-error"
                    label={meta.error}
                    defaultValue="Hello World"
                    {...restProps}
                    {...input}
                />
            </div>
        </form>
    );
}
