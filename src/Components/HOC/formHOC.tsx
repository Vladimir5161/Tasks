import React from 'react'
import { useFormik } from 'formik';
import { ID } from '../../types/types';
import { AddTaskFormTypes } from '../FormControls/AddTaskReduxForm'




export const FormHOC = (Component: React.FC<any>) => {
    interface FormComponentType {
        initialValues: {},
        functionToCall: (form: any) => void,
        validate: any,
        changePage?: () => void,
        BlockedButtonArray: Array<ID>,
        choseState?: { priority: string },
        handleChange?: (event: any) => void,
        handleUpdate?: (event: any) => void,
        choseStatus?: { status: string },
        changeStatus?: (event: any) => void,
        setDeadline?: () => void,
        settedTime?: string | null,
        settedDate?: string | null,
        formik?: any,
        confirm?: boolean
        setConfirm?: (confirm: boolean, id?: number, key?: string) => void,
        confirmSave?: boolean,
        setConfirmSave?: (value: boolean) => void,
        newSettedDate?: string | null,
        newSettedTime?: string | null,
    }
    const FormComponent: React.FC<FormComponentType> = ({ initialValues, functionToCall, validate, ...props }) => {
        const formik = useFormik({
            initialValues: initialValues,
            validate: validate,
            onSubmit: (values, { resetForm }) => {
                console.log(values)
                functionToCall(values)
                resetForm()
            }
        })
        return (
            <Component {...props} formik={formik} />
        )
    }
    return FormComponent
}

