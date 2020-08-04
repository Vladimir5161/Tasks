import React from 'react'
import { useFormik } from 'formik';
import { validate } from "../../validators/validators"



export const FormHOC = (Component) => {
    const FormComponent = (props) => {
        const formik = useFormik({
            initialValues: props.initialValues,
            validate,
            onSubmit: (values, { resetForm }) => {
                console.log(values)
                props.functionToCall(values)
                resetForm()
            }
        })
        return (
            <Component {...props} formik={formik} />
        )
    }
    return FormComponent
}

