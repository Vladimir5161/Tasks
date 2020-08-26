"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var TaskReducer_1 = require("../../../store/TaskReducer");
var TaskItem_1 = require("./TaskItem");
var AlertReducer_1 = require("../../../store/AlertReducer");
var TaskItemContainer = react_1["default"].memo(function (_a) {
    var _b, _c, _d, _e;
    var data = _a.data, id = _a.id, text = _a.text, BlockedButtonArray = _a.BlockedButtonArray, priority = _a.priority, status = _a.status, DeleteTaskThunk = _a.DeleteTaskThunk, keyFirebase = _a.keyFirebase, UpdateTaskThunk = _a.UpdateTaskThunk, SetToPrevStatusThunk = _a.SetToPrevStatusThunk, SetToDoneThunk = _a.SetToDoneThunk, settedDate = _a.settedDate, settedTime = _a.settedTime, confirm = _a.confirm, setConfirm = _a.setConfirm, deleteId = _a.deleteId, deleteKey = _a.deleteKey, taskPanel = _a.taskPanel, setTaskPanel = _a.setTaskPanel;
    var _f = react_1["default"].useState({
        priority: priority
    }), choseState = _f[0], setChoseState = _f[1];
    var handleChange = function (event) {
        setChoseState({
            priority: event.target.value
        });
    };
    //-------------
    // value for data from the edit form which we use in a function "handleUpdate" after user confirms updating
    var _g = react_1["default"].useState(null), form = _g[0], setFormData = _g[1];
    var _h = react_1["default"].useState({
        status: status
    }), choseStatus = _h[0], setStatus = _h[1];
    var changeStatus = function (event) {
        setStatus({ status: event.target.value });
    };
    var _j = react_1["default"].useState(''), errorDeadline = _j[0], setErrorDeadline = _j[1];
    //-------------
    // here we can set new date for "deadline" and check if it is not older than the current date
    var _k = react_1["default"].useState(null), calendarDate = _k[0], setCalendarDate = _k[1];
    var onChange = function (date) {
        var dateStr = date ? date.toString() : new Date();
        var resultDate = new Date(dateStr).getDate() === new Date().getDate();
        if (date) {
            if (date > new Date() && resultDate === false) {
                setCalendarDate(date);
                setAnimateCalendar(false);
                setAnimateClock(true);
                setErrorDeadline('');
            }
            else if (resultDate) {
                setCalendarDate(date);
                setAnimateCalendar(false);
                setAnimateClock(true);
                setErrorDeadline('');
            }
            else {
                setErrorDeadline('you cannot chose this date');
            }
        }
        else
            return null;
    };
    // the same for time
    var _l = react_1["default"].useState(null), selectedTime = _l[0], setSelectedTime = _l[1];
    var handleTimeChange = function (time) {
        if (time) {
            var timeStr = time.toString();
            var resultDate = new Date(timeStr).getTime() > new Date().getTime();
            console.log(resultDate);
            if (resultDate) {
                setSelectedTime(time);
                setDeadline();
                setAnimateCalendar(true);
                setAnimateClock(false);
                setErrorDeadline('');
            }
            else {
                setErrorDeadline('you cannot chose this time');
            }
        }
    };
    var _m = react_1["default"].useState(true), animateCalendar = _m[0], setAnimateCalendar = _m[1];
    var _o = react_1["default"].useState(false), animateClock = _o[0], setAnimateClock = _o[1];
    //-------------
    // - "missed", "urgent" - if difference is less then 24, or false
    var _p = react_1["default"].useState((_b = {},
        _b[id] = false,
        _b)), missed = _p[0], setMissed = _p[1];
    var _q = react_1["default"].useState((_c = {}, _c[id] = false, _c)), urgent = _q[0], setUrgent = _q[1];
    // this logic checks if the 'DEADLINE' date is later then the curent time and date and sets one of values for the task
    var _r = react_1["default"].useState((_d = {}, _d[id] = false, _d)), deadline = _r[0], changeDeadline = _r[1];
    var setDeadline = function () {
        var _a, _b;
        deadline[id]
            ? changeDeadline((_a = {}, _a[id] = false, _a))
            : changeDeadline((_b = {}, _b[id] = true, _b));
    };
    // here we are creating new date,checking if user has chosed a new deadline date and depends on it setting new or old deadline date
    var newSettedDate = calendarDate !== null
        ? calendarDate
            .toLocaleString()
            .split(",")[0]
            .split(".")
            .reverse()
            .join("-")
        : settedDate;
    var newSettedTime = selectedTime !== null
        ? selectedTime
            .toLocaleString()
            .split(",")[1]
            .split(":")
            .reverse()
            .splice(1, 2)
            .reverse()
            .join(":")
        : settedTime;
    // ----------------------
    // this function opens confirm modal window and save user's data which is going to be used in a function below
    var _s = react_1["default"].useState(false), confirmSave = _s[0], setConfirmSave = _s[1];
    var onSubmit = function (formData) {
        setFormData(formData);
        setConfirmSave(true);
    };
    var handleUpdate = function () {
        // this function will update a task and close task's edit field after that
        UpdateTaskThunk(form.text, choseStatus.status, id, data, newSettedDate, newSettedTime, choseState.priority, keyFirebase).then(EditButtonFunc());
    };
    var _t = react_1["default"].useState((_e = {}, _e[id] = false, _e)), editTask = _t[0], changeEditTask = _t[1];
    var EditButtonFunc = function () {
        var _a, _b;
        editTask[id]
            ? changeEditTask((_a = {}, _a[id] = false, _a))
            : changeEditTask((_b = {}, _b[id] = true, _b));
    };
    //----------------------------------
    // function which sets animated css style to the item and then delete the task once animation finished
    var DeleteTask = function (iD, keyFirebase) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setTaskPanel(iD);
            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, DeleteTaskThunk(id, keyFirebase)];
                        case 1:
                            _a.sent();
                            setTaskPanel(iD);
                            return [2 /*return*/];
                    }
                });
            }); }, 1100);
            return [2 /*return*/];
        });
    }); };
    //----------------------------------
    // changing the task status by clicking the checkbox
    var OnDoneButtonClick = function () {
        if (status === "done") {
            SetToPrevStatusThunk(keyFirebase || "button");
        }
        else {
            SetToDoneThunk(keyFirebase || "button");
        }
    };
    // -------------------------
    // logic below checks if current date is urgent for the task (less 24 hours to deadline time)
    var isUrgent = react_1.useCallback(function (settedDate, settedTime) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var newDate = new Date()
            .toLocaleString()
            .split(",")[0]
            .split(".")
            .reverse()
            .join("-");
        var newTime = new Date()
            .toLocaleString()
            .split(",")[1]
            .split(":")
            .reverse()
            .splice(1, 2)
            .reverse()
            .join(":");
        if (status === "done") {
            setUrgent((_a = {}, _a[id] = false, _a));
            setMissed((_b = {}, _b[id] = false, _b));
        }
        else if (settedDate) {
            if (new Date(newDate + newTime).getTime() >=
                new Date(settedDate + settedTime).getTime()) {
                setMissed((_c = {}, _c[id] = true, _c));
            }
            else {
                var resultDate = new Date(newDate + newTime).getTime() -
                    new Date(settedDate + settedTime).getTime(); // here we got a difference between today's date and deadline date in ms
                var resultDateToNumber = Math.abs(resultDate / (1000 * 3600)); // transforming it into hours
                var isInteger = function (num) {
                    return (num ^ 0) === num; // checking if value is positive
                };
                setMissed((_d = {}, _d[id] = false, _d));
                if (resultDateToNumber > 0) {
                    if (isInteger(resultDateToNumber)) {
                        if (resultDateToNumber < 24) {
                            setUrgent((_e = {}, _e[id] = true, _e));
                        }
                        else {
                            setUrgent((_f = {}, _f[id] = false, _f));
                        }
                    }
                    else {
                        var resultDateToNumberSplitted = resultDateToNumber
                            .toString()
                            .split(".")[1]
                            .split("");
                        var endNumbersToHours = (+resultDateToNumberSplitted[0] +
                            +resultDateToNumberSplitted[1]) /
                            60;
                        var finalDiffTime = +resultDateToNumber
                            .toString()
                            .split(".")[0] + +endNumbersToHours;
                        if (finalDiffTime < 24) {
                            setUrgent((_g = {}, _g[id] = true, _g));
                        }
                        else {
                            setUrgent((_h = {}, _h[id] = false, _h));
                        }
                    }
                }
                else
                    return null;
            }
        }
        else {
            setMissed((_j = {}, _j[id] = false, _j));
            setUrgent((_k = {}, _k[id] = false, _k));
        }
    }, [id, status]);
    react_1.useEffect(function () {
        // this is a function which runs the logic above when component is mounted or when one of the dependencies is changed
        var callUrgentFunc = function () {
            isUrgent(settedDate, settedTime);
        };
        callUrgentFunc();
    }, [settedDate, settedTime, isUrgent, status]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(TaskItem_1["default"], { animateCalendar: animateCalendar, animateClock: animateClock, deadline: deadline, onChange: onChange, handleTimeChange: handleTimeChange, choseState: choseState, changeStatus: changeStatus, handleChange: handleChange, setDeadline: setDeadline, handleUpdate: handleUpdate, onSubmit: onSubmit, choseStatus: choseStatus, missed: missed, taskPanel: taskPanel, urgent: urgent, OnDoneButtonClick: OnDoneButtonClick, setTaskPanel: setTaskPanel, data: data, id: id, text: text, BlockedButtonArray: BlockedButtonArray, priority: priority, status: status, editTask: editTask, keyFirebase: keyFirebase, EditButtonFunc: EditButtonFunc, settedDate: settedDate, settedTime: settedTime, newSettedDate: newSettedDate, newSettedTime: newSettedTime, confirm: confirm, setConfirm: setConfirm, DeleteTask: DeleteTask, deleteId: deleteId, deleteKey: deleteKey, confirmSave: confirmSave, setConfirmSave: setConfirmSave, selectedTime: selectedTime, errorDeadline: errorDeadline })));
});
exports["default"] = react_redux_1.connect(null, {
    UpdateTaskThunk: TaskReducer_1.UpdateTaskThunk,
    SetToPrevStatusThunk: TaskReducer_1.SetToPrevStatusThunk,
    SetToDoneThunk: TaskReducer_1.SetToDoneThunk,
    setConfirm: AlertReducer_1.setConfirm
})(TaskItemContainer);
