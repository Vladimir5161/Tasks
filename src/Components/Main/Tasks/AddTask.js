import React from "react";
import { AddTaskThunk } from "../../../store/TaskReducer";
import AddTaskForm from "../../FormControls/AddTaskReduxForm";
import { connect } from "react-redux";

const AddTask = ({ AddTaskThunk }) => {
    const [choseState, setChoseState] = React.useState({
        priority: "",
    });
    const handleChange = (event) => {
        setChoseState({
            priority: event.target.value,
        });
    };
    const [choseStatus, setStatus] = React.useState({
        status: "",
    });
    const changeStatus = (event) => {
        setStatus({ status: event.target.value });
    };
    const onSubmit = (formData) => {
        AddTaskThunk(choseState.priority, formData.text, choseStatus.status);
    };
    return (
        <AddTaskForm
            onSubmit={onSubmit}
            handleChange={handleChange}
            choseState={choseState}
            choseStatus={choseStatus}
            changeStatus={changeStatus}
        />
    );
};

export default connect(null, { AddTaskThunk })(AddTask);
