import { reset } from "redux-form";
import { SetMessage } from "./AlertReducer";
import app from "../api/firebase";
import _ from "lodash";
const Moment = require("moment");

const initialState = {
    TasksArray: [],
    BlockedButtonArray: [],
    DoneIdArray: [],
    loading: false,
};

const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETTASKS":
            const gotedArr = _.sortBy(action.tasks, [
                function (o) {
                    return new Moment(o.data).format("YYYY-MM-DD, h:mm:ss");
                },
            ]).reverse();
            return {
                ...state,
                TasksArray: (state.TasksArray = gotedArr),
            };
        case "DELETETASK":
            return {
                ...state,
                TasksArray: state.TasksArray.filter((i) => i.id !== action.id),
            };
        case "ADDTASK":
            return {
                ...state,
                TasksArray: [...state.TasksArray, action.task],
            };
        case "BLOCKBUTTON":
            return {
                ...state,
                BlockedButtonArray: state.BlockedButtonArray.some(
                    (id) => id === action.id
                )
                    ? state.BlockedButtonArray.filter((id) => id !== action.id)
                    : [...state.BlockedButtonArray, action.id],
            };
        case "UPDATETASK":
            return {
                ...state,
                TasksArray: state.TasksArray.map((item) =>
                    item.id === action.task.id
                        ? {
                              id: item.id,
                              priority: action.task.priority,
                              text: action.task.text,
                              status: action.task.status,
                              data: action.task.data,
                              keyFirebase: action.task.keyFirebase,
                              settedDate: action.task.settedDate,
                              settedTime: action.task.settedTime,
                          }
                        : item
                ),
            };
        case "SETTODONE":
            return {
                ...state,
                DoneIdArray: [...state.DoneIdArray, action.value],
            };
        case "SETTOUNDONE":
            return {
                ...state,
                DoneIdArray: state.DoneIdArray.filter(
                    (item) => item.id !== action.id
                ),
            };
        case "FILTERARRAY":
            const newState = { ...state };
            let array = newState.TasksArray;
            debugger;
            if (action.value === "priority" || action.value === "status") {
                const newTasksArray = _.sortBy(array, [
                    function (o) {
                        return o[action.value];
                    },
                ]);
                return {
                    ...state,
                    TasksArray: (state.TasksArray = newTasksArray),
                };
            } else if (action.value === "deadline") {
                debugger;
                const newTasksArray = _.sortBy(array, [
                    function (o) {
                        const dataForSort = o.settedDate + o.settedTime;
                        debugger;
                        return new Moment(dataForSort).format(
                            "YYYY-MM-DD, h:mm"
                        );
                    },
                ]);
                return {
                    ...state,
                    TasksArray: (state.TasksArray = newTasksArray),
                };
            } else {
                const newTasksArray = _.sortBy(array, [
                    function (o) {
                        return new Moment(o.data).format("YYYY-MM-DD, h:mm:ss");
                    },
                ]).reverse();
                return {
                    ...state,
                    TasksArray: (state.TasksArray = newTasksArray),
                };
            }
        case "LOADING":
            return {
                ...state,
                loading: state.loading ? false : true,
            };
        default:
            return state;
    }
};
export const Loading = () => ({ type: "LOADING" });
export const SetToDone = (value) => ({ type: "SETTODONE", value });
export const SetToUnDone = (id) => ({ type: "SETTOUNDONE", id });
export const getTasks = (tasks) => ({ type: "GETTASKS", tasks });
export const deleteTask = (id) => ({
    type: "DELETETASK",
    id,
});
export const updateTask = (task) => ({ type: "UPDATETASK", task });
export const addTask = (task) => ({ type: "ADDTASK", task });
export const blockButton = (id) => ({ type: "BLOCKBUTTON", id });
export const filterArray = (value) => ({ type: "FILTERARRAY", value });

export const SetToDoneThunk = (keyFirebase) => async (dispatch) => {
    await dispatch(blockButton(keyFirebase));
    try {
        await app
            .firestore()
            .collection("tasks")
            .doc(keyFirebase)
            .get()
            .then((doc) => {
                app.firestore()
                    .collection("tasks")
                    .doc(keyFirebase)
                    .update({
                        ...doc.data(),
                        keyFirebase: keyFirebase,
                        status: "done",
                        prevStatus:
                            doc.data().status === "done"
                                ? "new"
                                : doc.data().status,
                    });
                dispatch(
                    updateTask({
                        ...doc.data(),
                        keyFirebase: keyFirebase,
                        status: "done",
                        prevStatus:
                            doc.data().status === "done"
                                ? "new"
                                : doc.data().status,
                    })
                );
            });
    } catch (error) {
        dispatch(SetMessage(error.message, "error"));
    }
    dispatch(blockButton(keyFirebase));
};

export const SetToPrevStatusThunk = (keyFirebase) => async (dispatch) => {
    await dispatch(blockButton(keyFirebase));
    try {
        await app
            .firestore()
            .collection("tasks")
            .doc(keyFirebase)
            .get()
            .then((doc) => {
                app.firestore()
                    .collection("tasks")
                    .doc(keyFirebase)
                    .update({
                        ...doc.data(),
                        keyFirebase: keyFirebase,
                        status:
                            doc.data().prevStatus === doc.data().status
                                ? "new"
                                : doc.data().prevStatus,
                        prevStatus: doc.data().status,
                    });
                dispatch(
                    updateTask({
                        ...doc.data(),
                        keyFirebase: keyFirebase,
                        status:
                            doc.data().prevStatus === doc.data().status
                                ? "new"
                                : doc.data().prevStatus,
                        prevStatus: doc.data().status,
                    })
                );
            });
    } catch (error) {
        dispatch(SetMessage(error.message, "error"));
    }
    dispatch(blockButton(keyFirebase));
};
export const GetTasksThunk = () => async (dispatch) => {
    try {
        const array = [];
        await app
            .firestore()
            .collection("tasks")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    const task = {
                        keyFirebase: doc.id,
                        ...doc.data(),
                    };
                    array.push(task);
                });
            });
        dispatch(getTasks(array));
    } catch (error) {
        dispatch(
            SetMessage(
                "Hi user, you are not logged in, please log in to see tasks or create your account",
                "warning"
            )
        );
    }
};

export const DeleteTaskThunk = (id, keyFirebase) => async (dispatch) => {
    await dispatch(blockButton(id));
    try {
        await dispatch(deleteTask(id));
        await app.firestore().collection("tasks").doc(keyFirebase).delete();
    } catch {
        dispatch(SetMessage("something went wrong", "error"));
    }
    dispatch(blockButton(id));
};
export const AddTaskThunk = (
    priority,
    text,
    status,
    settedTime,
    settedDate
) => async (dispatch, getState) => {
    const sortedByIdTasksArray = getState().tasks.TasksArray.sort(function (
        a,
        b
    ) {
        return a.id - b.id;
    });
    const newId =
        getState().tasks.TasksArray.length !== 0
            ? getState().tasks.TasksArray.length === 1
                ? +getState().tasks.TasksArray[
                      getState().tasks.TasksArray.length - 1
                  ].id + +1
                : +sortedByIdTasksArray[sortedByIdTasksArray.length - 1].id + +1
            : 1;
    const newDate = new Date()
        .toLocaleString()
        .split(",")[0]
        .split(".")
        .reverse()
        .join("-");
    const newTime = new Date()
        .toLocaleString()
        .split(",")[1]
        .split(":")
        .reverse()
        .splice(1, 2)
        .reverse()
        .join(":");
    const task = {
        id: newId,
        data: newDate + newTime,
        priority: priority || null,
        text: text,
        status: status || "new",
        prevStatus: null,
        settedTime: settedTime || null,
        settedDate: settedDate || null,
    };

    dispatch(blockButton("addTask"));
    try {
        dispatch(Loading());
        await app.firestore().collection("tasks").add(task);
        await dispatch(addTask(task));
        dispatch(reset("addTask"));
        dispatch(Loading());
    } catch {
        dispatch(SetMessage("something went wrong", "error"));
    }
    dispatch(blockButton("addTask"));
};
export const UpdateTaskThunk = (
    priority,
    text,
    status,
    id,
    keyFirebase,
    date,
    newSettedDate,
    newSettedTime
) => async (dispatch) => {
    const task = {
        keyFirebase: keyFirebase,
        id: id,
        data: date,
        priority: priority || null,
        text: text,
        status: status || "new",
        prevStatus: status || "new",
        settedDate: newSettedDate,
        settedTime: newSettedTime,
    };
    await dispatch(blockButton("editTask"));
    try {
        await app.firestore().collection("tasks").doc(keyFirebase).update(task);
        await dispatch(updateTask(task));
        dispatch(reset("editTask"));
    } catch {
        dispatch(SetMessage("something went wrong", "error"));
    }
    dispatch(blockButton("editTask"));
};

export default TaskReducer;
