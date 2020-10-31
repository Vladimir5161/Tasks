import React from "react";
import TextField from "@material-ui/core/TextField";

interface ErrorValidateTypes {
    label?: string;
    name: string;
    value: string;
    onChange: () => void;
    state: {
        showPass: boolean;
    };
}

const ErrorValidatePass: React.FC<ErrorValidateTypes> = ({
    label,
    name,
    value,
    onChange,
    state,
}) => {
    return (
        <TextField
            error
            label={label}
            type={state.showPass ? "text" : "password"}
            name={name}
            onChange={onChange}
            value={value}
            autoFocus={true}
            className="passField"
        />
    );
};

export default ErrorValidatePass;
