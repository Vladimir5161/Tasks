import React from "react";
import { reduxForm } from "redux-form";
import { createField, InputForm } from "./Field";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import "./AddTask.css";
import PrioritySelect from "../CommonComponents/PrioritySelect";
import { ExpansionPanel, ExpansionPanelSummary } from "@material-ui/core";
import StatusSelect from "../CommonComponents/StatusSelect";
import { required } from "../../validators/validators";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const EditTaskReduxFrom = ({
    choseState,
    handleChange,
    choseStatus,
    changeStatus,
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
                        {createField("texts", "text", [required], InputForm, {
                            inputLabel: "Task text",
                        })}
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
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
            </div>
        </form>
    );
};

const EditTaskForm = reduxForm({ form: "editTask" })(EditTaskReduxFrom);
export default EditTaskForm;
