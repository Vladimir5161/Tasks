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
import { connect } from "react-redux";
import { UpdateTaskThunk } from "../../../store/TaskReducer";

const TaskItem = ({
    written,
    data,
    id,
    text,
    ChangeTextId,
    priority,
    status,
    DeleteClass,
    DeleteTaskThunk,
    keyFirebase,
    EditButtonClass,
    editTask,
    EditButtonFunc,
    UpdateTaskThunk,
}) => {
    const [choseState, setChoseState] = React.useState({
        priority: priority,
        name: "hai",
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setChoseState({
            ...choseState,
            [name]: event.target.value,
        });
    };
    const [choseStatus, setStatus] = React.useState("");
    const changeStatus = (event) => {
        setStatus(event.target.value);
    };
    const onSubmit = (form) => {
        UpdateTaskThunk(
            choseState.priority,
            form.text,
            choseStatus,
            id,
            keyFirebase
        );
        EditButtonFunc(id);
    };
    return (
        <div>
            {editTask.some((item) => item === id) ? (
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
                />
            ) : (
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >
                        <div className="dataTasks">{data}</div>
                        {written.some((item) => item === id) ? (
                            <FormControlLabel
                                aria-label="Acknowledge"
                                control={<Checkbox />}
                                className="doneText"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                onMouseDown={(event) => {
                                    event.stopPropagation();
                                    ChangeTextId(id);
                                }}
                                label={text}
                            />
                        ) : (
                            <FormControlLabel
                                aria-label="Acknowledge"
                                control={<Checkbox />}
                                className="clearText"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                onMouseDown={(event) => {
                                    event.stopPropagation();
                                    ChangeTextId(id);
                                }}
                                label={text}
                            />
                        )}
                        <div className="choseDiv">
                            {priority ? (
                                <div className="priorityTask">
                                    priority: {priority}
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
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <EditButton
                            EditButtonClass={EditButtonClass}
                            EditButtonFunc={EditButtonFunc}
                            id={id}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )}
        </div>
    );
};
export default connect(null, { UpdateTaskThunk })(TaskItem);
