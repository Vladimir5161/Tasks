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
    const { label, name, value, onChange, state } = props;
    return (
        <div className="formBlock">
            <TextField
                error
                label={label}
                type={state.showPass ? "text" : "password"}
                name={name}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}
