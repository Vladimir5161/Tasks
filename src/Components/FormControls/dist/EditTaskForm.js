"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Button_1 = require("@material-ui/core/Button");
var Save_1 = require("@material-ui/icons/Save");
require("./AddTask.scss");
require("../Main/Tasks/tasks.scss");
var PrioritySelect_1 = require("../CommonComponents/PrioritySelect");
var AccordionSummary_1 = require("@material-ui/core/AccordionSummary");
var Accordion_1 = require("@material-ui/core/Accordion");
var core_1 = require("@material-ui/core");
var StatusSelect_1 = require("../CommonComponents/StatusSelect");
var ConfirmSave_1 = require("../CommonComponents/ConfirmSave");
var ErrorValidate_1 = require("../CommonComponents/ErrorValidate");
var redux_1 = require("redux");
var formHOC_1 = require("../HOC/formHOC");
var EditTaskForm = react_1["default"].memo(function (_a) {
    var choseState = _a.choseState, handleChange = _a.handleChange, choseStatus = _a.choseStatus, changeStatus = _a.changeStatus, BlockedButtonArray = _a.BlockedButtonArray, setDeadline = _a.setDeadline, handleUpdate = _a.handleUpdate, confirmSave = _a.confirmSave, setConfirmSave = _a.setConfirmSave, newSettedDate = _a.newSettedDate, newSettedTime = _a.newSettedTime, formik = _a.formik;
    var handleEditConfirm = function (value) {
        if (value) {
            setConfirmSave(false);
            handleUpdate();
        }
        else {
            setConfirmSave(false);
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        confirmSave ? (react_1["default"].createElement(ConfirmSave_1["default"], { open: confirmSave, handleSave: handleEditConfirm })) : null,
        react_1["default"].createElement("form", { onSubmit: formik.handleSubmit, style: { width: "100%" } },
            react_1["default"].createElement(Accordion_1["default"], null,
                react_1["default"].createElement(AccordionSummary_1["default"], { "aria-label": "Expand", "aria-controls": "additional-actions1-content", id: "additional-actions1-header" },
                    react_1["default"].createElement("div", { className: "inputTaskDiv" },
                        react_1["default"].createElement("div", { className: "inputBlock" }, formik.errors.text ? (react_1["default"].createElement(ErrorValidate_1["default"], { name: "text", onChange: formik.handleChange, value: formik.values.text, label: formik.errors.text })) : (react_1["default"].createElement("div", { className: "formBlock" },
                            react_1["default"].createElement(core_1.TextField, { label: "edit Task", type: "text", name: "text", onChange: formik.handleChange, value: formik.values.text, autoFocus: true }))))),
                    react_1["default"].createElement("div", { className: "choseDiv" },
                        react_1["default"].createElement(PrioritySelect_1["default"], { choseState: choseState, handleChange: handleChange }),
                        react_1["default"].createElement(StatusSelect_1["default"], { choseStatus: choseStatus, handleChange: changeStatus })),
                    newSettedDate ? (react_1["default"].createElement("div", { className: "dataTasks deadlineTasks deadlineTasksEdit" },
                        "Deadline:",
                        react_1["default"].createElement("div", { style: {
                                display: "inline",
                                marginLeft: "5px"
                            } },
                            !newSettedDate ? null : newSettedDate,
                            " ",
                            !newSettedTime ? null : newSettedTime))) : null,
                    react_1["default"].createElement(Button_1["default"], { className: "setDeadlineIcon", startIcon: react_1["default"].createElement("img", { alt: "", src: "/calendar.png", style: {
                                width: "30px",
                                height: "30px"
                            } }), onClick: function () { return setDeadline(); } }))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(Button_1["default"], { variant: "contained", type: "submit", color: "primary", size: "small", className: 'saveButtonAnimated', startIcon: react_1["default"].createElement(Save_1["default"], null), disabled: BlockedButtonArray.some(function (id) { return id === "editTask"; }) }, "Save")))));
});
exports["default"] = redux_1.compose(formHOC_1.FormHOC)(EditTaskForm);
