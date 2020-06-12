import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteButton from "../../CommonComponents/DeleteButton";
import EditButton from "../../CommonComponents/EditButon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditTaskForm from "../../FormControls/EditTaskForm";
import { CalendarReact } from "../../CommonComponents/Calendar";
import Clock from "../../CommonComponents/Clock";

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
    }) => {
        const currentDate =
            settedDate !== null
                ? new Date(settedDate.split("-").join("/"))
                : new Date();
        const currentTime =
            settedTime !== null
                ? new Date(settedDate.split("-").join("/") + settedTime + ":00")
                : new Date();
        return (
            <div>
                {editTask.some((item) => item === id) ? (
                    <div>
                        {deadline[id] ? (
                            <>
                                <CalendarReact
                                    date={currentDate}
                                    onChange={onChange}
                                />
                                <Clock
                                    handleTimeChange={handleTimeChange}
                                    selectedTime={currentTime}
                                />
                            </>
                        ) : null}
                        <EditTaskForm
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
                        />
                    </div>
                ) : (
                    <div className={taskPanel[id]}>
                        <ExpansionPanel
                            style={
                                missed[id]
                                    ? { boxShadow: "0 0 10px 3px blue" }
                                    : urgent[id]
                                    ? { boxShadow: "0 0 10px 3px red" }
                                    : status === "done"
                                    ? { boxShadow: "0 0 10px 3px green" }
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
                                    <div className="dataTasks">{data}</div>
                                    {missed[id] ? (
                                        <div
                                            style={{
                                                position: "absolute",
                                                display: "inline",
                                                margin: "0 auto",
                                                left: "0",
                                                right: "0",
                                            }}
                                            className="dataTasks urgentTask"
                                        >
                                            Missed Task!
                                        </div>
                                    ) : urgent[id] ? (
                                        <div
                                            style={{
                                                position: "absolute",
                                                display: "inline",
                                                margin: "0 auto",
                                                left: "0",
                                                right: "0",
                                            }}
                                            className="dataTasks urgentTask"
                                        >
                                            Urgent Task!
                                        </div>
                                    ) : null}
                                    {settedDate ? (
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
                                <>
                                    <div className="choseDiv">
                                        {priority ? (
                                            <div className="priorityTask">
                                                priority:
                                                <div
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
                                                </div>
                                            </div>
                                        ) : null}
                                        {status ? (
                                            <div className="statusTask">
                                                status: {status}
                                            </div>
                                        ) : null}
                                    </div>
                                </>
                                <DeleteButton
                                    DeleteTask={DeleteTask}
                                    id={id}
                                    keyFirebase={keyFirebase}
                                    BlockedButtonArray={BlockedButtonArray}
                                />
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <EditButton
                                    EditButtonFunc={EditButtonFunc}
                                    id={id}
                                    BlockedButtonArray={BlockedButtonArray}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                )}
            </div>
        );
    }
);
export default TaskItem;
