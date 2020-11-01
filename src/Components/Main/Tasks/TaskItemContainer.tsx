import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
    UpdateTaskThunk,
    SetToPrevStatusThunk,
    SetToDoneThunk,
} from "../../../store/TaskReducer";
import TaskItem from "./TaskItem";
import { setConfirm } from "../../../store/AlertReducer";
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
        deleteId,
        deleteKey,
        taskPanel,
        setTaskPanel,
    }) => {
        let [choseState, setChoseState]: any = React.useState({
            priority: priority,
        });
        const handleChange = (event: any) => {
            setChoseState({
                priority: event.target.value,
            });
        };
        //-------------
        // value for data from the edit form which we use in a function "handleUpdate" after user confirms updating
        let [form, setFormData]: any = React.useState(null);

        let [choseStatus, setStatus]: any = React.useState({
            status: status,
        });
        const changeStatus = (event: any) => {
            setStatus({ status: event.target.value });
        };
        let [errorDeadline, setErrorDeadline] = React.useState("");
        //-------------
        // here we can set new date for "deadline" and check if it is not older than the current date
        let [calendarDate, setCalendarDate]: any = React.useState(null);
        const onChange = (date: null | Date[] | Date) => {
            const dateStr = date ? date.toString() : new Date();
            const resultDate =
                new Date(dateStr).getDate() === new Date().getDate();
            if (date) {
                if (date > new Date() && resultDate === false) {
                    setCalendarDate(date);
                    setAnimateCalendar(false);
                    setAnimateClock(true);
                    setErrorDeadline("");
                } else if (resultDate) {
                    setCalendarDate(date);
                    setAnimateCalendar(false);
                    setAnimateClock(true);
                    setErrorDeadline("");
                } else {
                    setErrorDeadline("you cannot chose this date");
                }
            } else return null;
        };
        // the same for time
        let [selectedTime, setSelectedTime]: any = React.useState(null);
        const handleTimeChange = (time: null | Date[] | Date) => {
            if (time) {
                const timeStr = time.toString();

                const resultDate =
                    new Date(calendarDate) >= new Date()
                        ? true
                        : new Date(timeStr).getTime() > new Date().getTime()
                        ? true
                        : false;

                if (resultDate) {
                    setSelectedTime(time);
                    setDeadline();
                    setAnimateCalendar(true);
                    setAnimateClock(false);
                    setErrorDeadline("");
                } else {
                    setErrorDeadline("you cannot chose this time");
                }
            }
        };
        let [animateCalendar, setAnimateCalendar] = React.useState(true);
        let [animateClock, setAnimateClock] = React.useState(false);
        //-------------
        // - "missed", "urgent" - if difference is less then 24, or false
        const [missed, setMissed] = React.useState({
            [id]: false,
        });
        let [urgent, setUrgent] = React.useState({ [id]: false });
        // this logic checks if the 'DEADLINE' date is later then the curent time and date and sets one of values for the task

        let [deadline, changeDeadline]: any = React.useState({ [id]: false });
        const setDeadline = () => {
            deadline[id]
                ? changeDeadline({ [id]: false })
                : changeDeadline({ [id]: true });
        };

        // here we are creating new date,checking if user has chosed a new deadline date and depends on it setting new or old deadline date

        const newSettedDate =
            calendarDate !== null
                ? calendarDate
                      .toLocaleString()
                      .split(",")[0]
                      .split(".")
                      .reverse()
                      .join("-")
                : settedDate;

        const newSettedTime =
            selectedTime !== null
                ? selectedTime
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
        let [confirmSave, setConfirmSave] = React.useState(false);
        const onSubmit = (formData: any) => {
            setFormData(formData);
            setConfirmSave(true);
        };
        const handleUpdate = () => {
            // this function will update a task and close task's edit field after that
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
        // function which sets animated css style to the item and then delete the task once animation finished
        const DeleteTask = async (iD: number, keyFirebase: string) => {
            setTaskPanel(iD);
            setTimeout(async () => {
                await DeleteTaskThunk(id, keyFirebase);
                setTaskPanel(iD);
            }, 1100);
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

        // -------------------------
        // logic below checks if current date is urgent for the task (less 24 hours to deadline time)
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
                } else if (settedDate) {
                    if (
                        new Date(newDate + newTime).getTime() >=
                        new Date(settedDate + settedTime).getTime()
                    ) {
                        setMissed({ [id]: true });
                    } else {
                        const resultDate =
                            new Date(newDate + newTime).getTime() -
                            new Date(settedDate + settedTime).getTime(); // here we got a difference between today's date and deadline date in ms
                        const resultDateToNumber = Math.abs(
                            resultDate / (1000 * 3600)
                        ); // transforming it into hours

                        const isInteger = (num: number) => {
                            return (num ^ 0) === num; // checking if value is positive
                        };
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
            [id, status]
        );
        useEffect(() => {
            // this is a function which runs the logic above when component is mounted or when one of the dependencies is changed
            const callUrgentFunc = () => {
                isUrgent(settedDate, settedTime);
            };
            callUrgentFunc();
        }, [settedDate, settedTime, isUrgent, status]);

        return (
            <>
                <TaskItem
                    animateCalendar={animateCalendar}
                    animateClock={animateClock}
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
                    errorDeadline={errorDeadline}
                />
            </>
        );
    }
);

export default connect(null, {
    UpdateTaskThunk,
    SetToPrevStatusThunk,
    SetToDoneThunk,
    setConfirm,
})(TaskItemContainer);
