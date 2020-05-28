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
import { connect } from "react-redux";
import {
    UpdateTaskThunk,
    SetToPrevStatusThunk,
    SetToDoneThunk,
} from "../../../store/TaskReducer";
const Moment = require("moment");

const TaskItem = React.memo(
    ({
        data,
        id,
        text,
        priority,
        status,
        DeleteClass,
        DeleteTaskThunk,
        keyFirebase,
        EditButtonClass,
        editTask,
        EditButtonFunc,
        UpdateTaskThunk,
        SetToPrevStatusThunk,
        SetToDoneThunk,
        BlockedButtonArray,
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
        const [choseStatus, setStatus] = React.useState({
            status: status,
        });
        const changeStatus = (event) => {
            setStatus({ status: event.target.value });
        };

        let [date, setDate] = React.useState({ [id]: new Date() });
        const onChange = (date) => setDate({ [id]: date });

        const [selectedTime, setSelectedTime] = React.useState({
            [id]: new Date(),
        });
        const handleTimeChange = (time) => {
            setSelectedTime({ [id]: time });
        };
        console.log(date[id]);
        const newSettedDate = date[id]
            .toLocaleString()
            .split(",")[0]
            .split(".")
            .reverse()
            .join("-");
        const newSettedTime = selectedTime[id]
            .toLocaleString()
            .split(",")[1]
            .split(":")
            .reverse()
            .splice(1, 2)
            .reverse()
            .join(":");
        const onSubmit = (form) => {
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
        const newData = settedDate + settedTime;
        const sum = () => {
            console.log("bla");
            if (data > newData) {
                return true;
            } else {
                return false;
            }
        };
        sum();
        return (
            <div>
                {editTask.some((item) => item === id) ? (
                    <div>
                        <CalendarReact date={date[id]} onChange={onChange} />
                        <Clock
                            handleTimeChange={handleTimeChange}
                            selectedTime={selectedTime[id]}
                        />
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
                        />
                    </div>
                ) : (
                    <div>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                            >
                                <div className="dataTasks">{data}</div>
                                <div
                                    className="dataTasks"
                                    style={{
                                        display: "block",
                                        right: "25px",
                                        left: "auto",
                                        textAlign: "right",
                                    }}
                                >
                                    Deadline:
                                    <div
                                        style={{
                                            display: "inline",
                                            marginLeft: "5px",
                                        }}
                                    >
                                        {!settedDate ? null : settedDate}{" "}
                                        {!settedTime ? null : settedTime}
                                    </div>
                                </div>
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
                                    label={text}
                                />
                                <div className="choseDiv">
                                    {priority ? (
                                        <div className="priorityTask">
                                            priority:
                                            <div
                                                style={
                                                    priority === "high"
                                                        ? {
                                                              color: "red",
                                                              textIndent: "5px",
                                                          }
                                                        : priority === "middle"
                                                        ? {
                                                              color: "green",
                                                              textIndent: "5px",
                                                          }
                                                        : {
                                                              color: "yellow",
                                                              textIndent: "5px",
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
                                <DeleteButton
                                    DeleteClass={DeleteClass}
                                    DeleteTaskThunk={DeleteTaskThunk}
                                    id={id}
                                    keyFirebase={keyFirebase}
                                    BlockedButtonArray={BlockedButtonArray}
                                />
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <EditButton
                                    EditButtonClass={EditButtonClass}
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
export default connect(null, {
    UpdateTaskThunk,
    SetToPrevStatusThunk,
    SetToDoneThunk,
})(TaskItem);
