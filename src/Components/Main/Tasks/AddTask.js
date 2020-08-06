import React from "react";
import { AddTaskThunk } from "../../../store/TaskReducer";
import AddTaskForm from "../../FormControls/AddTaskReduxForm";
import { connect } from "react-redux";
import { CalendarReact } from "../../CommonComponents/Calendar";
import Clock from "../../CommonComponents/Clock";
import { validateAdd } from "../../../validators/validators";


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

    //-----------------
    // here we can set new date for "deadline" and check if it is not older than the current date
    let [date, setDate] = React.useState(null);
    const onChange = (date) => { if (date >= new Date()) { setDate(date) } else return null }

    let [deadline, changeDeadline] = React.useState(false);

    const setDeadline = () => {
        deadline
            ? changeDeadline(false)
            : changeDeadline(true);
    };
    // the same for time
    const [selectedTime, setSelectedTime] = React.useState(null);
    const handleTimeChange = (date) => {
        setSelectedTime(date);
        changeDeadline()
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

    const onSubmit = (data) => {
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
            AddTaskThunk(
                choseState.priority,
                data.addTask,
                choseStatus.status,
                null,
                null
            );
        } else {
            AddTaskThunk(
                choseState.priority,
                data.addTask,
                choseStatus.status,
                settedTime,
                settedDate
            );
        }
        changeAddTask(false);
    };
    return (
        <>
            {deadline ?
                <div className="deadlineBlock" >
                    <div className="deadline">
                        <CalendarReact date={date} onChange={onChange} />
                        <Clock
                            handleTimeChange={handleTimeChange}
                            selectedTime={selectedTime}
                        />
                    </div>
                </div>
                : null}
            <AddTaskForm
                onSubmit={onSubmit}
                handleChange={handleChange}
                choseState={choseState}
                choseStatus={choseStatus}
                changeStatus={changeStatus}
                BlockedButtonArray={BlockedButtonArray}
                setDeadline={setDeadline}
                settedDate={settedDate}
                settedTime={settedTime}
                initialValues={{ addTask: "" }}
                functionToCall={onSubmit}
                validate={validateAdd}
            />
        </>
    );
};

export default connect(null, { AddTaskThunk })(AddTask);
