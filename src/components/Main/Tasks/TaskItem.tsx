import React, { Suspense } from "react";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteButton from "../../CommonComponents/DeleteButton";
import EditButton from "../../CommonComponents/EditButon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CalendarReact } from "../../CommonComponents/Calendar";
import Preloader from "../../CommonComponents/Preloader";
import { validateForm } from "../../../validators/validators";
import { TaskItemTypes } from "../../../types/types";

const EditTaskForm = React.lazy(
  () => import("../../FormControls/EditTaskForm")
);
const Clock = React.lazy(() => import("../../CommonComponents/Clock"));

const TaskItem: React.FC<TaskItemTypes> = React.memo(
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
    animateCalendar,
    animateClock,
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
    setConfirm,
    handleUpdate,
    confirmSave,
    setConfirmSave,
    errorDeadline,
  }) => {
    const currentDate =
      newSettedDate !== null && newSettedDate !== undefined
        ? new Date(newSettedDate.split("-").join("/"))
        : typeof settedDate === "string"
        ? new Date(settedDate.split("-").join("/"))
        : new Date();
    const currentTime =
      newSettedTime !== null && newSettedTime !== undefined
        ? new Date(newSettedDate.split("-").join("/") + newSettedTime + ":00")
        : settedDate
        ? typeof settedTime === "string"
          ? new Date(settedDate.split("-").join("/") + settedTime + ":00")
          : new Date()
        : new Date();
    return (
      <div>
        {editTask[id] ? (
          <div>
            {deadline[id] ? (
              <div className="deadlineBlock">
                <div className="deadline">
                  <CalendarReact
                    date={currentDate}
                    onChange={onChange}
                    animateCalendar={animateCalendar}
                    errorDeadline={errorDeadline}
                  />
                  <Suspense fallback={<Preloader />}>
                    <Clock
                      handleTimeChange={handleTimeChange}
                      currentTime={currentTime}
                      animateClock={animateClock}
                    />
                  </Suspense>
                </div>
              </div>
            ) : null}
            <Suspense fallback={<Preloader />}>
              <EditTaskForm
                initialValues={{ text: text }}
                choseState={choseState}
                choseStatus={choseStatus}
                changeStatus={changeStatus}
                handleChange={handleChange}
                BlockedButtonArray={BlockedButtonArray}
                setDeadline={setDeadline}
                handleUpdate={handleUpdate}
                confirmSave={confirmSave}
                setConfirmSave={setConfirmSave}
                newSettedDate={newSettedDate}
                newSettedTime={newSettedTime}
                functionToCall={onSubmit}
                validate={validateForm}
              />
            </Suspense>
          </div>
        ) : (
          <div
            className={
              taskPanel.some((iD) => iD === id)
                ? "taskPanelDelete" // classname for task with animation
                : "taskPanel" // static classname
            }
          >
            <Accordion
              style={
                status === "done"
                  ? { boxShadow: "0 0 10px 3px green" }
                  : missed[id]
                  ? { boxShadow: "0 0 10px 3px blue" }
                  : urgent[id]
                  ? { boxShadow: "0 0 10px 3px red" }
                  : undefined
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <>
                  <div className="dataTasks">Date: {data}</div>

                  {settedDate ? ( //deadline date and time which will be changed if a customer will change deadline
                    <div className="dataTasks deadlineTasks">
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
                </>
                <FormControlLabel
                  aria-label="Acknowledge"
                  control={
                    <Checkbox checked={status === "done" ? true : false} />
                  }
                  className={status === "done" ? "doneText" : "clearText"}
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
              </AccordionSummary>
              <AccordionDetails>
                <div className="choseDiv">
                  <EditButton EditButtonFunc={EditButtonFunc} id={id} />
                  <DeleteButton
                    id={id}
                    keyFirebase={keyFirebase}
                    setConfirm={setConfirm}
                  />
                  {status ? (
                    <div className="statusTask">
                      status:{" "}
                      <p
                        style={
                          status === "done"
                            ? {
                                fontWeight: "bold",
                                marginLeft: "5px",
                                display: "inline",
                                textAlign: "left",
                              }
                            : {
                                marginLeft: "5px",
                                display: "inline",
                                textAlign: "left",
                              }
                        }
                      >
                        {status === "done" ? status.toUpperCase() : status}
                      </p>
                    </div>
                  ) : null}
                  {priority ? (
                    <div className="priorityTask">
                      priority:
                      <p
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
                                color: "",
                                textIndent: "5px",
                              }
                        }
                      >
                        {priority}
                      </p>
                    </div>
                  ) : null}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </div>
    );
  }
);
export default TaskItem;
