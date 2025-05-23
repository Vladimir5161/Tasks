import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import "./AddTask.scss";
import "../Main/Tasks/tasks.scss";
import PrioritySelect from "../CommonComponents/PrioritySelect";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import StatusSelect from "../CommonComponents/StatusSelect";
import ErrorValidate from "../CommonComponents/ErrorValidate";
import { compose } from "redux";
import { FormHOC } from "../HOC/formHOC";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export interface AddTaskFormTypes {
    choseState: { priority: string | null };
    handleChange: (event: any) => void;
    choseStatus: { status: string };
    changeStatus: (event: any) => void;
    BlockedButtonArray: Array<number | string>;
    setDeadline: () => void;
    settedTime: string | null;
    settedDate: string | null;
    formik: any;
}

const AddTaskForm: React.FC<AddTaskFormTypes> = ({
    choseState,
    handleChange,
    choseStatus,
    changeStatus,
    BlockedButtonArray,
    settedTime,
    settedDate,
    setDeadline,
    formik,
}) => {
    const classes: any = useStyles();
    return (
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Accordion>
                <AccordionSummary
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >
                    <div className="inputTaskDiv">
                        <div className="inputBlock">
                            {formik.errors.text ? (
                                <ErrorValidate
                                    name="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.text}
                                    label={formik.errors.text}
                                />
                            ) : (
                                <div className="formBlock">
                                    <TextareaAutosize
                                        name="text"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.text}
                                        rowsMax={4}
                                        autoFocus={false}
                                        placeholder="Add Task"
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
                    {settedDate ? (
                        <div className="dataTasks deadlineTasks addTaskDeadline">
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

export default compose(FormHOC)(AddTaskForm);
