import React, { Suspense } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteButton from "../../CommonComponents/DeleteButton";
import EditButton from "../../CommonComponents/EditButon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CalendarReact } from "../../CommonComponents/Calendar";
import Preloader from "../../CommonComponents/Preloader";

const EditTaskForm = React.lazy(() => import("../../FormControls/EditTaskForm"))
const Clock = React.lazy(() => import("../../CommonComponents/Clock"))

const TaskItem = React.memo(
    ({
        data,
        id,
        text,
        priority,
        status,
        keyFirebase,
        editTask,
        EditButtonFunc,
        BlockedButtonArray,
        settedDate,
        settedTime,
        newSettedDate,
        newSettedTime,
        deadline,
        onChange,
        handleTimeChange,
        choseState,
        changeStatus,
        handleChange,
        setDeadline,
        onSubmit,
        choseStatus,
        missed,
        taskPanel,
        urgent,
        OnDoneButtonClick,
        DeleteTask,
        confirm,
        setConfirm,
        handleUpdate,
        handleEditConfirm,
        deleteId,
        deleteKey,
        confirmSave,
        setConfirmSave,
    }) => {
        const currentDate =
            newSettedDate !== null && newSettedDate !== undefined ?
                new Date(newSettedDate.split("-").join("/")) :
                typeof settedDate === "string" ?
                    new Date(settedDate.split("-").join("/")) :
                    new Date()
        const currentTime =
            newSettedTime !== null && newSettedTime !== undefined ?
                new Date(newSettedDate.split("-").join("/") + newSettedTime + ":00") :
                typeof settedTime === "string" ?
                    new Date(settedDate.split("-").join("/") + settedTime + ":00") :
                    new Date()
        return (
            <div>
                {editTask[id] ? (
                    <div>
                        {deadline[id] ? (
                            <div className="deadlineBlock" >
                                <div className="deadline">
                                    <CalendarReact
                                        date={currentDate}
                                        onChange={onChange}
                                    />
                                    <Suspense fallback={<Preloader />}><Clock
                                        handleTimeChange={handleTimeChange}
                                        selectedTime={currentTime}
                                    /></Suspense>
                                </div>
                            </div>
                        ) : null}
                        <Suspense fallback={<Preloader />}><EditTaskForm
                            initialValues={{
                                text: text,
                                keyFirebase: keyFirebase,
                                data: data,
                            }}
                            choseState={choseState}
                            choseStatus={choseStatus}
                            changeStatus={changeStatus}
                            handleChange={handleChange}
                            onSubmit={onSubmit}
                            BlockedButtonArray={BlockedButtonArray}
                            setDeadline={setDeadline}
                            confirm={confirm}
                            setConfirm={setConfirm}
                            handleUpdate={handleUpdate}
                            handleEditConfirm={handleEditConfirm}
                            confirmSave={confirmSave}
                            setConfirmSave={setConfirmSave}
                            newSettedDate={newSettedDate}
                            newSettedTime={newSettedTime}
                        /></Suspense>
                    </div>
                ) : (
                        <div className={taskPanel.some(iD => iD === id) ? "taskPanelDelete" : "taskPanel"}>
                            {missed[id] ? (
                                <div
                                    className=" urgentTask"
                                >
                                    Missed Task!
                                </div>
                            ) : urgent[id] ? (
                                <div
                                    className=" urgentTask"
                                >
                                    Urgent Task!
                                </div>
                            ) : null}
                            <ExpansionPanel
                                style={status === "done"
                                    ? { boxShadow: "0 0 10px 3px green" }
                                    : missed[id]
                                        ? { boxShadow: "0 0 10px 3px blue" }
                                        : urgent[id]
                                            ? { boxShadow: "0 0 10px 3px red" }
                                            : null
                                }
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-label="Expand"
                                    aria-controls="additional-actions1-content"
                                    id="additional-actions1-header"
                                >
                                    <>
                                        <div className="dataTasks">Date: {data}</div>

                                        {settedDate ? (  //deadline date and time which will be changed if a customer will change deadline
                                            <div className="dataTasks deadlineTasks">
                                                Deadline:
                                                <div
                                                    style={{
                                                        display: "inline",
                                                        marginLeft: "5px",
                                                    }}
                                                >
                                                    {!settedDate
                                                        ? null
                                                        : settedDate}{" "}
                                                    {!settedTime
                                                        ? null
                                                        : settedTime}
                                                </div>
                                            </div>
                                        ) : null}
                                    </>
                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        control={
                                            <Checkbox
                                                checked={
                                                    status === "done" ? true : false
                                                }
                                            />
                                        }
                                        className={
                                            status === "done"
                                                ? "doneText"
                                                : "clearText"
                                        }
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            OnDoneButtonClick();
                                        }}
                                        onFocus={(event) => event.stopPropagation()}
                                        onMouseDown={(event) => {
                                            event.stopPropagation();
                                        }}
                                        style={{ wordBreak: "break-word" }}
                                        label={text}
                                    />

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="choseDiv">
                                        {priority ? (
                                            <div className="priorityTask">
                                                priority:
                                                <p
                                                    style={
                                                        priority === "high"
                                                            ? {
                                                                color: "red",
                                                                textIndent:
                                                                    "5px",
                                                            }
                                                            : priority ===
                                                                "middle"
                                                                ? {
                                                                    color:
                                                                        "green",
                                                                    textIndent:
                                                                        "5px",
                                                                }
                                                                : {
                                                                    color:
                                                                        "yellow",
                                                                    textIndent:
                                                                        "5px",
                                                                }
                                                    }
                                                >
                                                    {priority}
                                                </p>
                                            </div>
                                        ) : null}
                                        <EditButton
                                            EditButtonFunc={EditButtonFunc}
                                            id={id}
                                            BlockedButtonArray={BlockedButtonArray}
                                        />
                                        <DeleteButton
                                            DeleteTask={DeleteTask}
                                            id={id}
                                            keyFirebase={keyFirebase}
                                            BlockedButtonArray={BlockedButtonArray}
                                            confirm={confirm}
                                            setConfirm={setConfirm}
                                            deleteId={deleteId}
                                            deleteKey={deleteKey}
                                        />
                                        {status ? (
                                            <div className="statusTask" >
                                                status: <div style={status === "done" ? { fontWeight: 'bold', marginLeft: "5px" } : { marginLeft: "5px" }}>{status === "done" ? status.toUpperCase() : status}</div>
                                            </div>
                                        ) : null}


                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    )
                }
            </div >
        );
    }
);
export default TaskItem;
