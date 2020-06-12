import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
    UpdateTaskThunk,
    SetToPrevStatusThunk,
    SetToDoneThunk,
} from "../../../store/TaskReducer";
import TaskItem from "./TaskItem";

const TaskItemContainer = React.memo(
    ({
        data,
        id,
        text,
        BlockedButtonArray,
        priority,
        status,
        editTask,
        DeleteTaskThunk,
        keyFirebase,
        EditButtonFunc,
        UpdateTaskThunk,
        SetToPrevStatusThunk,
        SetToDoneThunk,
        settedDate,
        settedTime,
    }) => {
        const [choseState, setChoseState] = React.useState({
            priority: priority,
        });
        const handleChange = (event) => {
            setChoseState({
                priority: event.target.value,
            });
        };

        //-------------

        const [choseStatus, setStatus] = React.useState({
            status: status,
        });
        const changeStatus = (event) => {
            setStatus({ status: event.target.value });
        };

        //-------------

        let [date, setDate] = React.useState({ [id]: null });
        const onChange = (date) => setDate({ [id]: date });

        //-------------

        const [selectedTime, setSelectedTime] = React.useState({
            [id]: null,
        });

        //-------------

        const [missed, setMissed] = React.useState({
            [id]: false,
        });
        const handleTimeChange = (time) => {
            setSelectedTime({ [id]: time });
        };

        //-------------

        let [taskPanel, setTaskPanel] = React.useState({
            [id]: "taskPanel",
        });

        //-------------

        const DeleteTask = async (id, keyFirebase) => {
            setTaskPanel({ [id]: "taskPanelDelete" });
            setTimeout(() => DeleteTaskThunk(id, keyFirebase), 2000);
        };

        //-------------

        const newSettedDate =
            date[id] !== null
                ? date[id]
                      .toLocaleString()
                      .split(",")[0]
                      .split(".")
                      .reverse()
                      .join("-")
                : settedDate;

        const newSettedTime =
            selectedTime[id] !== null
                ? selectedTime[id]
                      .toLocaleString()
                      .split(",")[1]
                      .split(":")
                      .reverse()
                      .splice(1, 2)
                      .reverse()
                      .join(":")
                : settedTime;

        // ----------------------

        const onSubmit = (form) => {
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
            if (
                new Date(newDate + newTime) >
                new Date(newSettedDate + newSettedTime)
            ) {
                UpdateTaskThunk(
                    choseState.priority,
                    form.text,
                    choseStatus.status,
                    id,
                    keyFirebase,
                    data,
                    settedDate,
                    settedTime
                ).then(EditButtonFunc(id));
            } else {
                UpdateTaskThunk(
                    choseState.priority,
                    form.text,
                    choseStatus.status,
                    id,
                    keyFirebase,
                    data,
                    newSettedDate,
                    newSettedTime
                ).then(EditButtonFunc(id));
            }
        };

        //-------------

        const OnDoneButtonClick = () => {
            if (status === "done") {
                SetToPrevStatusThunk(keyFirebase);
            } else {
                SetToDoneThunk(keyFirebase);
            }
        };
        // localStorage.setItem("name", JSON.stringify({ name: "vova" }));
        // let name = localStorage.getItem("name");
        // console.log(JSON.parse(name).name);
        let [urgent, setUrgent] = React.useState({ [id]: false });

        let [deadline, changeDeadline] = React.useState({ [id]: false });

        const setDeadline = () => {
            deadline[id]
                ? changeDeadline({ [id]: false })
                : changeDeadline({ [id]: true });
        };

        // -------------------------
        // logic below checks if current date is urgent for the task (less 24 hours to deadline time)
        useEffect(() => {
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
            const isUrgent = (settedDate, settedTime) => {
                if (
                    settedDate !== undefined ||
                    settedDate !== null ||
                    settedTime !== undefined ||
                    settedTime !== null
                ) {
                    if (
                        new Date(newDate + newTime).getTime() >=
                        new Date(settedDate + settedTime).getTime()
                    ) {
                        setMissed({ [id]: true });
                    } else {
                        const resultDate =
                            new Date(newDate + newTime).getTime() -
                            new Date(settedDate + settedTime).getTime();
                        const resultDateToNumber = Math.abs(
                            resultDate / (1000 * 3600)
                        );

                        function isInteger(num) {
                            return (num ^ 0) === num;
                        }
                        setMissed({ [id]: false });
                        if (resultDateToNumber > 0) {
                            if (isInteger(resultDateToNumber)) {
                                if (resultDateToNumber < 24) {
                                    setUrgent({ [id]: true });
                                } else {
                                    setUrgent({ [id]: false });
                                }
                            } else {
                                const resultDateToNumberSplitted = resultDateToNumber
                                    .toString()
                                    .split(".")[1]
                                    .split("");
                                const endNumbersToHours =
                                    (resultDateToNumberSplitted[0] +
                                        resultDateToNumberSplitted[1]) /
                                    60;
                                const finalDiffTime =
                                    +resultDateToNumber
                                        .toString()
                                        .split(".")[0] + +endNumbersToHours;
                                if (finalDiffTime < 24) {
                                    setUrgent({ [id]: true });
                                } else {
                                    setUrgent({ [id]: false });
                                }
                            }
                        } else return null;
                    }
                } else if (status === "done") {
                    setUrgent({ [id]: false });
                    setMissed({ [id]: false });
                } else {
                    return setUrgent({ [id]: false });
                }
            };

            const callUrgentFunc = () => {
                isUrgent(settedDate, settedTime);
            };
            callUrgentFunc();
        }, [id, settedDate, settedTime, status, newSettedDate, newSettedTime]);

        return (
            <>
                <TaskItem
                    deadline={deadline}
                    onChange={onChange}
                    handleTimeChange={handleTimeChange}
                    choseState={choseState}
                    changeStatus={changeStatus}
                    handleChange={handleChange}
                    setDeadline={setDeadline}
                    onSubmit={onSubmit}
                    choseStatus={choseStatus}
                    missed={missed}
                    taskPanel={taskPanel}
                    urgent={urgent}
                    OnDoneButtonClick={OnDoneButtonClick}
                    DeleteTask={DeleteTask}
                    data={data}
                    id={id}
                    text={text}
                    BlockedButtonArray={BlockedButtonArray}
                    priority={priority}
                    status={status}
                    editTask={editTask}
                    keyFirebase={keyFirebase}
                    EditButtonFunc={EditButtonFunc}
                    settedDate={settedDate}
                    settedTime={settedTime}
                />
            </>
        );
    }
);

export default connect(null, {
    UpdateTaskThunk,
    SetToPrevStatusThunk,
    SetToDoneThunk,
})(TaskItemContainer);
