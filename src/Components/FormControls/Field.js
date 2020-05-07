import React from "react";
import { Field } from "redux-form";
import ErrorValidate from "../CommonComponents/ErrorValidate";
import { TextField } from "@material-ui/core";

export const createField = (
    placeholder,
    name,
    validators,
    component,
    props = {},
    text = ""
) => (
    <div className="createField">
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        />{" "}
        {text}
    </div>
);

export const InputForm = ({ inputLabel, ...props }) => {
    let { input, meta, ...restProps } = props;
    const hasError = meta.error && meta.touched;
    return (
        <div className="inputBlock">
            {hasError ? <ErrorValidate {...input} {...restProps} /> : null}
            <div className="formBlock">
                <TextField
                    label={inputLabel}
                    type="text"
                    {...input}
                    {...restProps}
                />
            </div>
        </div>
    );
};

export const InputFormPass = ({ inputLabel, ...props }) => {
    let { input, meta, ...restProps } = props;
    const hasError = meta.error && meta.touched;
    return (
        <div className="inputBlock">
            {hasError ? <ErrorValidate {...input} {...restProps} /> : null}
            <div className="formBlock">
                <TextField
                    label={inputLabel}
                    type="password"
                    autoComplete="current-password"
                    {...input}
                    {...restProps}
                />
            </div>
        </div>
    );
};
