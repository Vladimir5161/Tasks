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
import ConfirmSave from "../CommonComponents/ConfirmSave";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const EditTaskReduxFrom = React.memo(
    ({
        choseState,
        handleChange,
        choseStatus,
        changeStatus,
        BlockedButtonArray,
        setDeadline,
        selectedTime,
        confirm,
        setConfirm,
        handleUpdate,
        confirmSave,
        setConfirmSave,
        ...props
    }) => {
        const classes = useStyles();
        const handleEditConfirm = (value) => {
            if (value) {
                setConfirmSave(false);
                handleUpdate()
            } else {
                setConfirmSave(false);
            }
        };
        return (
            <form onSubmit={props.handleSubmit} style={{ width: "100%" }}>
                {confirmSave ? <ConfirmSave open={confirmSave} handleSave={handleEditConfirm} /> : null}
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
                                [required],
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
                        <Button
                            className="setDeadlineIcon"
                            startIcon={
                                <img
                                    alt=""
                                    src="/calendar.png"
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                    }}
                                />
                            }
                            onClick={() => setDeadline()}
                        ></Button>
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
                        disabled={BlockedButtonArray.some(
                            (id) => id === "editTask"
                        )}
                    >
                        Save
                    </Button>
                </div>
            </form>
        );
    }
);

const EditTaskForm = reduxForm({ form: "editTask" })(EditTaskReduxFrom);
export default EditTaskForm;
