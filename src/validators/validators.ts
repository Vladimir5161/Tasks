import * as _ from "lodash";

interface validateLoginType {
    email?: string;
    password?: string;
    userName?: string;
}
export const validateLogin = (values: validateLoginType, formik: any) => {
    const errors: validateLoginType = {};
    if (!values.email) {
        formik.errors.email = "Required";
    } else if (values.email.length < 5) {
        errors.email = "Must be 5 characters or more";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length > 0 && values.password.length < 5) {
        errors.password = "Must be 5 characters or more";
    }
    if (!values.userName) {
        errors.userName = "Required";
    } else if (values.userName.length > 0 && values.userName.length < 3) {
        errors.userName = "Must be 5 characters or more";
    }

    if (values.password) {
        if (
            values.password.length > 0 &&
            values.password
                .split("")
                .some(
                    (item) => _.range(10).includes(+item)
                )
        ) {
            return undefined;
        } else {
            errors.password = "password should includes at least one number";
        }
    }
    return errors;
};
interface validateFormType {
    addTask?: string;
    text?: string;
}
export const validateForm = (values: validateFormType) => {
    const errors: validateFormType = {};
    if (!values.text) {
        errors.text = "Required";
    } else if (values.text.length < 5) {
        errors.text = "Must be 5 characters or more";
    } else if (values.text.length > 300) {
        errors.text = "Too long";
    }
    return errors;
};
