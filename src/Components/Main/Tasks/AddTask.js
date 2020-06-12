import React from "react";
import { AddTaskThunk } from "../../../store/TaskReducer";
import AddTaskForm from "../../FormControls/AddTaskReduxForm";
import { connect } from "react-redux";
import { CalendarReact } from "../../CommonComponents/Calendar";
import Clock from "../../CommonComponents/Clock";

const AddTask = ({ AddTaskThunk, changeAddTask, BlockedButtonArray }) => {
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
    let [date, setDate] = React.useState(null);
    const onChange = (date) => setDate(date);

    const [selectedTime, setSelectedTime] = React.useState(null);
    const handleTimeChange = (date) => {
        setSelectedTime(date);
    };
    const settedDate =
        date !== null
            ? date.toLocaleString().split(",")[0].split(".").reverse().join("-")
            : null;
    const settedTime =
        selectedTime !== null
            ? selectedTime
                  .toLocaleString()
                  .split(",")[1]
                  .split(":")
                  .reverse()
                  .splice(1, 2)
                  .reverse()
                  .join(":")
            : null;

    const onSubmit = (formData) => {
        const newDate = new Date()
            .toLocaleString()
            .split(",")[0]
            .split(".")
            .reverse()
            .join("-");
        const newTime = new Date()
            .toLocaleString()
            .split(",")[1]
            .split(":")
            .reverse()
            .splice(1, 2)
            .reverse()
            .join(":");
        const resultDate =
            new Date(newDate + newTime) > new Date(settedDate + settedTime)
                ? true
                : false;

        if (resultDate) {
            debugger;
            AddTaskThunk(
                choseState.priority,
                formData.text,
                choseStatus.status,
                null,
                null
            );
        } else {
            AddTaskThunk(
                choseState.priority,
                formData.text,
                choseStatus.status,
                settedTime,
                settedDate
            );
        }
        changeAddTask(false);
    };
    return (
        <>
            <CalendarReact date={date} onChange={onChange} />
            <Clock
                handleTimeChange={handleTimeChange}
                selectedTime={selectedTime}
            />
            <AddTaskForm
                onSubmit={onSubmit}
                handleChange={handleChange}
                choseState={choseState}
                choseStatus={choseStatus}
                changeStatus={changeStatus}
                BlockedButtonArray={BlockedButtonArray}
            />
        </>
    );
};

export default connect(null, { AddTaskThunk })(AddTask);
