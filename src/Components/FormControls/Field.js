import React from "react";
import { Field } from "redux-form";
import ErrorValidate from "../CommonComponents/ErrorValidate";
import { TextField } from "@material-ui/core";
import Checkbox from "../CommonComponents/Checkbox";
import ErrorValidatePass from "../CommonComponents/ErroValidatePass";

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
            {hasError ? (
                <ErrorValidate {...input} {...restProps} meta={meta} />
            ) : (
                <div className="formBlock">
                    <TextField
                        label={inputLabel}
                        type="text"
                        {...input}
                        {...restProps}
                    />
                </div>
            )}
        </div>
    );
};

export const InputFormPass = ({ inputLabel, ...props }) => {
    let { input, meta, ...restProps } = props;
    const hasError = meta.error && meta.touched;
    const [state, setState] = React.useState({
        checkedB: false,
    });

    return (
        <div
            className="inputBlock"
            style={{
                display: "grid",
                flexDirection: "row",
                position: "relative",
            }}
        >
            <Checkbox setState={setState} state={state} />
            {hasError ? (
                <ErrorValidatePass
                    {...input}
                    {...restProps}
                    meta={meta}
                    state={state}
                />
            ) : (
                <div className="formBlock">
                    <TextField
                        label={inputLabel}
                        type={state.checkedB ? "text" : "password"}
                        autoComplete="current-password"
                        {...input}
                        {...restProps}
                    />
                </div>
            )}
        </div>
    );
};
