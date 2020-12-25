import React from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import "./AddTask.scss";
import "../Main/Tasks/tasks.scss";
import PrioritySelect from "../CommonComponents/PrioritySelect";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import { TextareaAutosize } from "@material-ui/core";
import StatusSelect from "../CommonComponents/StatusSelect";
import ConfirmSave from "../CommonComponents/ConfirmSave";
import ErrorValidate from "../CommonComponents/ErrorValidate";
import { compose } from "redux";
import { FormHOC } from "../HOC/formHOC";

interface EditTaskFormTypes {
    choseState: { priority: string | null };
    handleChange: (event: any) => void;
    setTaskPanel: (id: number) => void;
    choseStatus: { status: string };
    changeStatus: (event: any) => void;
    BlockedButtonArray: Array<number | string>;
    setDeadline: () => void;
    handleUpdate: () => void;
    confirmSave: boolean;
    setConfirmSave: (value?: boolean) => void;
    newSettedDate: string | null;
    newSettedTime: string | null;
    formik: any;
    setConfirm: (confirm: boolean, id?: number, key?: string) => void;
}

const EditTaskForm: React.FC<EditTaskFormTypes> = React.memo(
    ({
        choseState,
        handleChange,
        choseStatus,
        changeStatus,
        BlockedButtonArray,
        setDeadline,
        handleUpdate,
        confirmSave,
        setConfirmSave,
        newSettedDate,
        newSettedTime,
        formik,
    }) => {
        const handleEditConfirm = (value?: boolean) => {
            if (value) {
                setConfirmSave(false);
                handleUpdate();
            } else {
                setConfirmSave(false);
            }
        };
        return (
            <>
                {confirmSave ? (
                    <ConfirmSave
                        open={confirmSave}
                        handleSave={handleEditConfirm}
                    />
                ) : null}
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
                                                defaultValue={
                                                    formik.values.text
                                                }
                                                rowsMax={4}
                                                autoFocus={false}
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
                                        {!newSettedDate ? null : newSettedDate}{" "}
                                        {!newSettedTime ? null : newSettedTime}
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
                            className="saveButtonAnimated"
                            startIcon={<SaveIcon />}
                            disabled={BlockedButtonArray.some(
                                (id) => id === "editTask"
                            )}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </>
        );
    }
);

export default compose(FormHOC)(EditTaskForm);
