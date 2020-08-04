import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import "./AddTask.scss";
import "../Main/Tasks/tasks.scss";
import PrioritySelect from "../CommonComponents/PrioritySelect";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import { TextField } from "@material-ui/core";
import StatusSelect from "../CommonComponents/StatusSelect";
import ConfirmSave from "../CommonComponents/ConfirmSave";
import ErrorValidate from "../CommonComponents/ErrorValidate";
import { compose } from "redux";
import { FormHOC } from "../HOC/formHOC";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const EditTaskForm = React.memo(
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
        newSettedDate,
        newSettedTime,
        formik,
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
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                {confirmSave ? <ConfirmSave open={confirmSave} handleSave={handleEditConfirm} /> : null}
                <Accordion>
                    <AccordionSummary
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >
                        <div className="inputTaskDiv">
                            <div className="inputBlock">
                                {formik.errors.addTask ? (
                                    <ErrorValidate name='text' onChange={formik.handleChange}
                                        value={formik.values.text} label={formik.errors.text} />
                                ) : (
                                        <div className="formBlock">
                                            <TextField
                                                label="edit Task"
                                                type="text"
                                                name='text'
                                                onChange={formik.handleChange}
                                                value={formik.values.text}
                                            />
                                        </div>
                                    )}
                            </div>
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

                        {newSettedDate ? (
                            <div className="dataTasks deadlineTasks deadlineTasksEdit">
                                Deadline:
                                <div
                                    style={{
                                        display: "inline",
                                        marginLeft: "5px",
                                    }}
                                >
                                    {!newSettedDate
                                        ? null
                                        : newSettedDate}{" "}
                                    {!newSettedTime
                                        ? null
                                        : newSettedTime}
                                </div>
                            </div>
                        ) : null}
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
                    </AccordionSummary>
                </Accordion>
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


export default compose(FormHOC)(EditTaskForm);
