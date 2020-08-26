"use strict";
exports.__esModule = true;
var react_1 = require("react");
var AccordionSummary_1 = require("@material-ui/core/AccordionSummary");
var AccordionDetails_1 = require("@material-ui/core/AccordionDetails");
var Accordion_1 = require("@material-ui/core/Accordion");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
var DeleteButton_1 = require("../../CommonComponents/DeleteButton");
var EditButon_1 = require("../../CommonComponents/EditButon");
var ExpandMore_1 = require("@material-ui/icons/ExpandMore");
var Calendar_1 = require("../../CommonComponents/Calendar");
var Preloader_1 = require("../../CommonComponents/Preloader");
var validators_1 = require("../../../validators/validators");
var EditTaskForm = react_1["default"].lazy(function () {
    return Promise.resolve().then(function () { return require("../../FormControls/EditTaskForm"); });
});
var Clock = react_1["default"].lazy(function () { return Promise.resolve().then(function () { return require("../../CommonComponents/Clock"); }); });
var TaskItem = react_1["default"].memo(function (_a) {
    var data = _a.data, id = _a.id, text = _a.text, priority = _a.priority, status = _a.status, keyFirebase = _a.keyFirebase, editTask = _a.editTask, EditButtonFunc = _a.EditButtonFunc, BlockedButtonArray = _a.BlockedButtonArray, settedDate = _a.settedDate, settedTime = _a.settedTime, animateCalendar = _a.animateCalendar, animateClock = _a.animateClock, newSettedDate = _a.newSettedDate, newSettedTime = _a.newSettedTime, deadline = _a.deadline, onChange = _a.onChange, handleTimeChange = _a.handleTimeChange, choseState = _a.choseState, changeStatus = _a.changeStatus, handleChange = _a.handleChange, setDeadline = _a.setDeadline, onSubmit = _a.onSubmit, choseStatus = _a.choseStatus, missed = _a.missed, taskPanel = _a.taskPanel, urgent = _a.urgent, OnDoneButtonClick = _a.OnDoneButtonClick, DeleteTask = _a.DeleteTask, confirm = _a.confirm, setConfirm = _a.setConfirm, handleUpdate = _a.handleUpdate, deleteId = _a.deleteId, deleteKey = _a.deleteKey, confirmSave = _a.confirmSave, setConfirmSave = _a.setConfirmSave, errorDeadline = _a.errorDeadline;
    var currentDate = newSettedDate !== null && newSettedDate !== undefined
        ? new Date(newSettedDate.split("-").join("/"))
        : typeof settedDate === "string"
            ? new Date(settedDate.split("-").join("/"))
            : new Date();
    var currentTime = newSettedTime !== null && newSettedTime !== undefined
        ? new Date(newSettedDate.split("-").join("/") + newSettedTime + ":00")
        : settedDate
            ? typeof settedTime === "string"
                ? new Date(settedDate.split("-").join("/") + settedTime + ":00")
                : new Date()
            : new Date();
    return (react_1["default"].createElement("div", null, editTask[id] ? (react_1["default"].createElement("div", null,
        deadline[id] ? (react_1["default"].createElement("div", { className: "deadlineBlock" },
            react_1["default"].createElement("div", { className: "deadline" },
                react_1["default"].createElement(Calendar_1.CalendarReact, { date: currentDate, onChange: onChange, animateCalendar: animateCalendar, errorDeadline: errorDeadline }),
                react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(Preloader_1["default"], null) },
                    react_1["default"].createElement(Clock, { handleTimeChange: handleTimeChange, currentTime: currentTime, animateClock: animateClock }))))) : null,
        react_1["default"].createElement(react_1.Suspense, { fallback: react_1["default"].createElement(Preloader_1["default"], null) },
            react_1["default"].createElement(EditTaskForm, { initialValues: { text: text }, choseState: choseState, choseStatus: choseStatus, changeStatus: changeStatus, handleChange: handleChange, BlockedButtonArray: BlockedButtonArray, setDeadline: setDeadline, confirm: confirm, setConfirm: setConfirm, handleUpdate: handleUpdate, confirmSave: confirmSave, setConfirmSave: setConfirmSave, newSettedDate: newSettedDate, newSettedTime: newSettedTime, functionToCall: onSubmit, validate: validators_1.validateEdit })))) : (react_1["default"].createElement("div", { className: taskPanel.some(function (iD) { return iD === id; })
            ? "taskPanelDelete" // classname for task with animation
            : "taskPanel" // static classname
     },
        missed[id] ? (react_1["default"].createElement("div", { className: " urgentTask" }, "Missed Task!")) : urgent[id] ? (react_1["default"].createElement("div", { className: " urgentTask" }, "Urgent Task!")) : null,
        react_1["default"].createElement(Accordion_1["default"], { style: status === "done"
                ? { boxShadow: "0 0 10px 3px green" }
                : missed[id]
                    ? { boxShadow: "0 0 10px 3px blue" }
                    : urgent[id]
                        ? { boxShadow: "0 0 10px 3px red" }
                        : undefined },
            react_1["default"].createElement(AccordionSummary_1["default"], { expandIcon: react_1["default"].createElement(ExpandMore_1["default"], null), "aria-label": "Expand", "aria-controls": "additional-actions1-content", id: "additional-actions1-header" },
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("div", { className: "dataTasks" },
                        "Date: ",
                        data),
                    settedDate ? ( //deadline date and time which will be changed if a customer will change deadline
                    react_1["default"].createElement("div", { className: "dataTasks deadlineTasks" },
                        "Deadline:",
                        react_1["default"].createElement("div", { style: {
                                display: "inline",
                                marginLeft: "5px"
                            } },
                            !settedDate
                                ? null
                                : settedDate,
                            " ",
                            !settedTime
                                ? null
                                : settedTime))) : null),
                react_1["default"].createElement(FormControlLabel_1["default"], { "aria-label": "Acknowledge", control: react_1["default"].createElement(Checkbox_1["default"], { checked: status === "done" ? true : false }), className: status === "done"
                        ? "doneText"
                        : "clearText", onClick: function (event) {
                        event.stopPropagation();
                        OnDoneButtonClick();
                    }, onFocus: function (event) { return event.stopPropagation(); }, onMouseDown: function (event) {
                        event.stopPropagation();
                    }, style: { wordBreak: "break-word" }, label: text })),
            react_1["default"].createElement(AccordionDetails_1["default"], null,
                react_1["default"].createElement("div", { className: "choseDiv" },
                    react_1["default"].createElement(EditButon_1["default"], { EditButtonFunc: EditButtonFunc, id: id }),
                    react_1["default"].createElement(DeleteButton_1["default"], { DeleteTask: DeleteTask, id: id, keyFirebase: keyFirebase, confirm: confirm, setConfirm: setConfirm, deleteId: deleteId, deleteKey: deleteKey }),
                    status ? (react_1["default"].createElement("div", { className: "statusTask" },
                        "status:",
                        " ",
                        react_1["default"].createElement("div", { style: status === "done"
                                ? {
                                    fontWeight: "bold",
                                    marginLeft: "5px"
                                }
                                : { marginLeft: "5px" } }, status === "done"
                            ? status.toUpperCase()
                            : status))) : null,
                    priority ? (react_1["default"].createElement("div", { className: "priorityTask" },
                        "priority:",
                        react_1["default"].createElement("p", { style: priority === "high"
                                ? {
                                    color: "red",
                                    textIndent: "5px"
                                }
                                : priority === "middle"
                                    ? {
                                        color: "green",
                                        textIndent: "5px"
                                    }
                                    : {
                                        color: "",
                                        textIndent: "5px"
                                    } }, priority))) : null)))))));
});
exports["default"] = TaskItem;
