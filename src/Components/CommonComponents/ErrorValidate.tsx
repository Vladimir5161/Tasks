import React from "react";
import TextField from "@material-ui/core/TextField";

interface ErrorValidateTypes {
    label?: string;
    name: string;
    value: string;
    onChange: () => void;
    autoFocus?: string;
}
const ErrorValidate: React.FC<ErrorValidateTypes> = ({
    label,
    name,
    value,
    onChange,
}) => {
    return (
        <TextField
            error
            label={label}
            type="text"
            name={name}
            onChange={onChange}
            value={value}
            autoFocus={true}
            className="loginField"
        />
    );
};

export default ErrorValidate;
