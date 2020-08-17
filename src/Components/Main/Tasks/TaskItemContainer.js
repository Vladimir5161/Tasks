import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
    UpdateTaskThunk,
    SetToPrevStatusThunk,
    SetToDoneThunk,
} from "../../../store/TaskReducer";
import TaskItem from "./TaskItem";
import { setConfirm } from '../../../store/AlertReducer'
const TaskItemContainer = React.memo(
    ({
        data,
        id,
        text,
        BlockedButtonArray,
        priority,
        status,
        DeleteTaskThunk,
        keyFirebase,
        UpdateTaskThunk,
        SetToPrevStatusThunk,
        SetToDoneThunk,
        settedDate,
        settedTime,
        confirm,
        setConfirm,
        handleEditConfirm,
        TasksArray,
        deleteId,
        deleteKey,
        taskPanel,
        setTaskPanel
    }) => {
        // simple useEffect which upates task once one of params changes(written to add keyFirebase to each task which was created), keyFirebase is task's id given by Firebase
        useEffect(() => {
            UpdateTaskThunk(
                priority,
                text,
                status,
                id,
                keyFirebase,
                data,
                settedDate,
                settedTime
            )
        }, [TasksArray.length, UpdateTaskThunk, priority,
            text,
            status,
            id,
            keyFirebase,
            data,
            settedDate,
            settedTime])

        let [choseState, setChoseState] = React.useState({
            priority: priority,
        });
        const handleChange = (event) => {
            setChoseState({
                priority: event.target.value,
            });
        }
        //-------------
        // value for data from the edit form which we use in a function "handleUpdate" after user confirms updating
        let [form, setFormData] = React.useState(null)

        let [choseStatus, setStatus] = React.useState({
            status: status,
        });
        const changeStatus = (event) => {
            setStatus({ status: event.target.value });
        };

        //-------------
        // here we can set new date for "deadline" and check if it is not older than the current date
        let [date, setDate] = React.useState({ [id]: null });
        const onChange = (date) => { if (date >= new Date()) { setDate({ [id]: date }) } else return null }

        //-------------
        // the same for time
        let [selectedTime, setSelectedTime] = React.useState({
            [id]: null,
        });

        //-------------

        const [missed, setMissed] = React.useState({
            [id]: false,
        });

        const handleTimeChange = (time) => {
            setSelectedTime({ [id]: time });
            setDeadline(id)
        };
        // here we are creating new date,checking if user has chosed a new deadline date and depends on it setting new or old deadline date

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

        // this function opens confirm modal window and save user's data which is going to be used in a function below

        let [confirmSave, setConfirmSave] = React.useState(false)
        const onSubmit = (formData) => {
            setFormData(formData)
            setConfirmSave(true)
        }
        const handleUpdate = () => {
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
        };

        //----------------------------------
        // function which sets animated css style to the item and then deleting the task once animation finished
        const DeleteTask = (iD, keyFirebase) => {
            setTaskPanel(iD);
            setTimeout(() => { DeleteTaskThunk(id, keyFirebase); setTaskPanel(iD) }, 1000);
        };
        //----------------------------------
        // changing the task status by clicking the checkbox
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

        // this logic checks if the 'DEADLINE' date is later then the curent time and date and sets one of values for the task 
        // - "missed", "urgent" - if difference is less then 24, or false
        const isUrgent = useCallback(
            () => {

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

                if (status === "done") {
                    setUrgent({ [id]: false });
                    setMissed({ [id]: false });
                }
                else if (
                    settedDate
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
                } else {
                    setMissed({ [id]: false });
                    setUrgent({ [id]: false });
                }
            },
            [settedDate, settedTime, id, status],
        );
        useEffect(() => {
            // this is a function which runs the logic above when component is mounted or shen one of the dependencies is changed
            const callUrgentFunc = () => {
                isUrgent(settedDate, settedTime);
            };
            callUrgentFunc();
        }, [settedDate, settedTime, isUrgent, status]);

        let [editTask, changeEditTask] = React.useState({ [id]: false });
        const EditButtonFunc = () => {
            editTask[id]
                ? changeEditTask({ [id]: false })
                : changeEditTask({ [id]: true });
        };

        return (
            <>
                <TaskItem
                    deadline={deadline}
                    onChange={onChange}
                    handleTimeChange={handleTimeChange} // changes deadline time
                    choseState={choseState}
                    changeStatus={changeStatus}
                    handleChange={handleChange}
                    setDeadline={setDeadline}
                    handleUpdate={handleUpdate}
                    onSubmit={onSubmit}
                    choseStatus={choseStatus}
                    missed={missed}
                    taskPanel={taskPanel} // an array of id's with setted animation css for deleting the task
                    urgent={urgent}
                    OnDoneButtonClick={OnDoneButtonClick}
                    setTaskPanel={setTaskPanel} // function deletes or adds task's id from taskPanel array
                    data={data}
                    id={id}
                    text={text}
                    BlockedButtonArray={BlockedButtonArray} // an array of ids which shows should button be blocked or not
                    priority={priority}
                    status={status}
                    editTask={editTask}
                    keyFirebase={keyFirebase}
                    EditButtonFunc={EditButtonFunc}
                    settedDate={settedDate}
                    settedTime={settedTime}
                    newSettedDate={newSettedDate}
                    newSettedTime={newSettedTime}
                    confirm={confirm}
                    setConfirm={setConfirm}
                    handleEditConfirm={handleEditConfirm}
                    DeleteTask={DeleteTask}
                    deleteId={deleteId}
                    deleteKey={deleteKey}
                    confirmSave={confirmSave}
                    setConfirmSave={setConfirmSave}
                />
            </>
        );
    }
);

export default connect(null, {
    UpdateTaskThunk,
    SetToPrevStatusThunk,
    SetToDoneThunk,
    setConfirm
})(TaskItemContainer);
