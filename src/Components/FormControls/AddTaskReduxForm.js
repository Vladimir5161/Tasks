import React from "react";
import { reduxForm } from "redux-form";
import { createField, InputForm } from "./Field";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import "./AddTask.css";
import PrioritySelect from "../CommonComponents/PrioritySelect";
import { ExpansionPanel, ExpansionPanelSummary } from "@material-ui/core";
import StatusSelect from "../CommonComponents/StatusSelect";
import { required, minLength } from "../../validators/validators";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const AddTaskReduxFrom = ({
    choseState,
    handleChange,
    choseStatus,
    changeStatus,
    BlockedButtonArray,
    settedTime,
    settedDate,
    ...props
}) => {
    const classes = useStyles();
    return (
        <form onSubmit={props.handleSubmit} style={{ width: "100%" }}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >
                    <div className="inputTaskDiv">
                        {createField(
                            "texts",
                            "text",
                            [required, minLength],
                            InputForm,
                            {
                                inputLabel: "Task text",
                            }
                        )}
                    </div>
                    <div className="choseDiv">
                        <PrioritySelect
                            choseState={choseState}
                            handleChange={handleChange}
                        />
                        <StatusSelect
                            choseStatus={choseStatus}
                            handleChange={changeStatus}
                        />
                    </div>
                </ExpansionPanelSummary>
            </ExpansionPanel>
            <div>
                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    disabled={BlockedButtonArray.some((id) => id === "addTask")}
                >
                    Add
                </Button>
            </div>
        </form>
    );
};

const AddTaskForm = reduxForm({ form: "addTask" })(AddTaskReduxFrom);
export default AddTaskForm;
