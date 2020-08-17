import React from "react";
import TextField from "@material-ui/core/TextField";


interface ErrorValidateTypes {
    label?: string,
    name: string,
    value: string,
    onChange: () => void,
}
const ErrorValidate: React.FC<ErrorValidateTypes> = ({ label, name, value, onChange }) => {
    return (
        <div className="formBlock">
            <TextField
                error
                label={label}
                type="text"
                name={name}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

export default ErrorValidate