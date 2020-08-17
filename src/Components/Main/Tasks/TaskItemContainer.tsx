import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
    UpdateTaskThunk,
    SetToPrevStatusThunk,
    SetToDoneThunk,
} from "../../../store/TaskReducer";
import TaskItem from "./TaskItem";
import { setConfirm } from '../../../store/AlertReducer'
import { TaskItemContainerTypes } from "../../../types/types";




const TaskItemContainer: React.FC<TaskItemContainerTypes> = React.memo(
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
        TasksArray,
        deleteId,
        deleteKey,
        taskPanel,
        setTaskPanel,
    }) => {
        // simple useEffect which upates task once one of params changes(written to add keyFirebase to each task which was created), keyFirebase is task's id given by Firebase
        useEffect(() => {
            UpdateTaskThunk(
                text,
                status,
                id,
                data,
                settedDate,
                settedTime,
                priority,
                keyFirebase

            )
        }, [TasksArray.length, UpdateTaskThunk, priority,
            text,
            status,
            id,
            keyFirebase,
            data,
            settedDate,
            settedTime])

        let [choseState, setChoseState]: any = React.useState({
            priority: priority,
        });
        const handleChange = (event: any) => {
            setChoseState({
                priority: event.target.value,
            });
        }
        //-------------
        // value for data from the edit form which we use in a function "handleUpdate" after user confirms updating
        let [form, setFormData]: any = React.useState(null)

        let [choseStatus, setStatus]: any = React.useState({
            status: status,
        });
        const changeStatus = (event: any) => {
            setStatus({ status: event.target.value });
        };

        //-------------
        // here we can set new date for "deadline" and check if it is not older than the current date
        let [date, setDate]: any = React.useState({ [id]: null });
        const onChange = (date: null | Date[] | Date) => {
            if (date) {
                if (date >= new Date()) { setDate({ [id]: date }) } else return null
            } else return null
        }
        //-------------
        // the same for time
        let [selectedTime, setSelectedTime]: any = React.useState({
            [id]: null,
        });

        //-------------

        const [missed, setMissed] = React.useState({
            [id]: false,
        });
        let [urgent, setUrgent] = React.useState({ [id]: false });

        let [deadline, changeDeadline]: any = React.useState({ [id]: false });

        const setDeadline = () => {
            deadline[id]
                ? changeDeadline({ [id]: false })
                : changeDeadline({ [id]: true });
        };

        const handleTimeChange = (time: null | Date[] | Date) => {
            setSelectedTime({ [id]: time });
            setDeadline()
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
        const onSubmit = (formData: any) => {
            setFormData(formData)
            setConfirmSave(true)
        }
        const handleUpdate = () => {
            UpdateTaskThunk(
                form.text,
                choseStatus.status,
                id,
                data,
                newSettedDate,
                newSettedTime,
                choseState.priority,
                keyFirebase
            ).then(EditButtonFunc());
        };

        let [editTask, changeEditTask] = React.useState({ [id]: false });
        const EditButtonFunc = (): any => {
            editTask[id]
                ? changeEditTask({ [id]: false })
                : changeEditTask({ [id]: true });
        };
        //----------------------------------
        // function which sets animated css style to the item and then deleting the task once animation finished
        const DeleteTask = (iD: number, keyFirebase: string) => {
            setTaskPanel(iD);
            setTimeout(() => { DeleteTaskThunk(id, keyFirebase); setTaskPanel(iD) }, 1000);
        };
        //----------------------------------
        // changing the task status by clicking the checkbox
        const OnDoneButtonClick = () => {
            if (status === "done") {
                SetToPrevStatusThunk(keyFirebase || "button");
            } else {
                SetToDoneThunk(keyFirebase || "button");
            }
        };
        // localStorage.setItem("name", JSON.stringify({ name: "vova" }));
        // let name = localStorage.getItem("name");
        // console.log(JSON.parse(name).name);


        // -------------------------
        // logic below checks if current date is urgent for the task (less 24 hours to deadline time)

        // this logic checks if the 'DEADLINE' date is later then the curent time and date and sets one of values for the task 
        // - "missed", "urgent" - if difference is less then 24, or false
        const isUrgent = useCallback(
            (settedDate: string | null, settedTime: string | null) => {

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

                        const isInteger = (num: number) => {
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
                                    (+resultDateToNumberSplitted[0] +
                                        +resultDateToNumberSplitted[1]) /
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
            [id, status],
        );
        useEffect(() => {
            // this is a function which runs the logic above when component is mounted or shen one of the dependencies is changed
            const callUrgentFunc = () => {
                isUrgent(settedDate, settedTime);
            };
            callUrgentFunc();
        }, [settedDate, settedTime, isUrgent, status]);



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
                    DeleteTask={DeleteTask}
                    deleteId={deleteId}
                    deleteKey={deleteKey}
                    confirmSave={confirmSave}
                    setConfirmSave={setConfirmSave}
                    selectedTime={selectedTime}
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
