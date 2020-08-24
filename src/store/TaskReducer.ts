import { SetMessage } from "./AlertReducer";
import {
    LoadingTypes,
    getTasksTypes,
    deleteTaskTypes,
    updateTaskTypes,
    addTaskTypes,
    blockButtonTypes,
    filterArrayTypes,
} from "../types/taskReducerTypes";
import app from "../api/firebase";
import _ from "lodash";
import { TaskTypes } from "../types/types";
import { Dispatch } from "redux";
import { AppStoreReducer } from "./rootReducer";
import { SetMessageTypes } from "../types/alertReducerTypes";
import { AuthUser } from "./AuthReducer";
const Moment = require("moment");

export interface InitialStateType {
    TasksArray: Array<TaskTypes>;
    BlockedButtonArray: Array<any>;
    loading: boolean;
}

const initialState: InitialStateType = {
    TasksArray: [],
    BlockedButtonArray: [],
    loading: false,
};
type InitialState = typeof initialState;

const TaskReducer = (
    state: InitialState = initialState,
    action: ActionTaskTypes
): InitialState => {
    switch (action.type) {
        // getting a new array of tasks sorted by the date
        case "GETTASKS":
            const gotedArr = _.sortBy(action.tasks, [
                function (o) {
                    return new Moment(o.data).format("YYYY-MM-DD, h:mm:ss");
                },
            ]).reverse();
            return {
                ...state,
                TasksArray: state.TasksArray = gotedArr,
            };
        // deleting the task for an array
        case "DELETETASK":
            return {
                ...state,
                TasksArray: state.TasksArray.filter((i) => i.id !== action.id),
            };
        // adding task to an array
        case "ADDTASK":
            return {
                ...state,
                TasksArray: [...state.TasksArray, action.task],
            };
        // adding or deleting an id of button which should be blocked once it was clicked till request will be finished
        case "BLOCKBUTTON":
            return {
                ...state,
                BlockedButtonArray: state.BlockedButtonArray.some(
                    (id) => id === action.id
                )
                    ? state.BlockedButtonArray.filter((id) => id !== action.id)
                    : [...state.BlockedButtonArray, action.id],
            };
        // updating the task in array
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

        // sorting an array by the chosen value
        case "FILTERARRAY":
            const newState = { ...state };
            let array = newState.TasksArray;
            if (action.value === "priority" || action.value === "status") {
                const newTasksArray = _.sortBy(array, [
                    function (o: any) {
                        return o[action.value];
                    },
                ]);
                return {
                    ...state,
                    TasksArray: state.TasksArray = newTasksArray,
                };
            } else if (action.value === "deadline") {
                const newTasksArray = _.sortBy(array, [
                    function (o: any) {
                        const dataForSort = o.settedDate + o.settedTime;
                        return new Moment(dataForSort).format(
                            "YYYY-MM-DD, h:mm"
                        );
                    },
                ]);
                return {
                    ...state,
                    TasksArray: state.TasksArray = newTasksArray,
                };
            } else {
                const newTasksArray = _.sortBy(array, [
                    function (o) {
                        return new Moment(o.data).format("YYYY-MM-DD, h:mm:ss");
                    },
                ]).reverse();
                return {
                    ...state,
                    TasksArray: state.TasksArray = newTasksArray,
                };
            }
        // booling value for loader
        case "LOADING":
            return {
                ...state,
                loading: state.loading ? false : true,
            };
        default:
            return state;
    }
};

export type ActionTaskTypes =
    | LoadingTypes
    | getTasksTypes
    | deleteTaskTypes
    | updateTaskTypes
    | addTaskTypes
    | blockButtonTypes
    | filterArrayTypes
    | SetMessageTypes;
type DispatchType = Dispatch<ActionTaskTypes>;

export const Loading = (): LoadingTypes => ({ type: "LOADING" });
export const getTasks = (tasks: Array<TaskTypes>): getTasksTypes => ({
    type: "GETTASKS",
    tasks,
});
export const deleteTask = (id: number): deleteTaskTypes => ({
    type: "DELETETASK",
    id,
});
export const updateTask = (task: TaskTypes | any): updateTaskTypes => ({
    type: "UPDATETASK",
    task,
});
export const addTask = (task: TaskTypes): addTaskTypes => ({
    type: "ADDTASK",
    task,
});
export const blockButton = (id: number | string): blockButtonTypes => ({
    type: "BLOCKBUTTON",
    id,
});
export const filterArray = (value: string): filterArrayTypes => ({
    type: "FILTERARRAY",
    value,
});

export const SetToDoneThunk = (keyFirebase: string) => async (
    dispatch: DispatchType,
    getState: () => AppStoreReducer
) => {
    const userId: any = getState().auth.user.userId;
    await dispatch(blockButton(keyFirebase));
    // here we are getting an array of tasks an updating one of tasks with new value of STATUS field, making some actions if request failed
    try {
        await app
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("tasks")
            .doc(keyFirebase)
            .get()
            .then((querySnapshot: any) => {
                app.firestore()
                    .collection("users")
                    .doc(userId)
                    .collection("tasks")
                    .doc(keyFirebase)
                    .update({
                        ...querySnapshot.data(),
                        keyFirebase: keyFirebase,
                        status: "done",
                        prevStatus:
                            querySnapshot.data().status === "done"
                                ? "new"
                                : querySnapshot.data().status,
                    });
                dispatch(
                    updateTask({
                        ...querySnapshot.data(),
                        keyFirebase: keyFirebase,
                        status: "done",
                        prevStatus:
                            querySnapshot.data().status === "done"
                                ? "new"
                                : querySnapshot.data().status,
                    })
                );
            });
    } catch (error) {
        dispatch(SetMessage(error.message, "error"));
    }
    dispatch(blockButton(keyFirebase));
};

// here we are getting an array of tasks an updating one of tasks with new value of STATUS field, making some actions if request failed
export const SetToPrevStatusThunk = (keyFirebase: string) => async (
    dispatch: DispatchType,
    getState: () => AppStoreReducer
) => {
    const userId: any = getState().auth.user.userId;
    dispatch(blockButton(keyFirebase));
    try {
        await app
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("tasks")
            .doc(keyFirebase)
            .get()
            .then((querySnapshot: any) => {
                app.firestore()
                    .collection("users")
                    .doc(userId)
                    .collection("tasks")
                    .doc(keyFirebase)
                    .update({
                        ...querySnapshot.data(),
                        keyFirebase: keyFirebase,
                        status:
                            querySnapshot.data().prevStatus ===
                            querySnapshot.data().status
                                ? "new"
                                : querySnapshot.data().prevStatus,
                        prevStatus: querySnapshot.data().status,
                    });
                dispatch(
                    updateTask({
                        ...querySnapshot.data(),
                        keyFirebase: keyFirebase,
                        status:
                            querySnapshot.data().prevStatus ===
                            querySnapshot.data().status
                                ? "new"
                                : querySnapshot.data().prevStatus,
                        prevStatus: querySnapshot.data().status,
                    })
                );
            });
    } catch (error) {
        dispatch(SetMessage(error.message, "error"));
    }
    dispatch(blockButton(keyFirebase));
};

// here we are getting the collection of tasks of an authorized user or making some actions in case if request failed
export const GetTasksThunk = (): any => async (
    dispatch: DispatchType,
    getState: () => AppStoreReducer
) => {
    const userId: any = getState().auth.user.userId;
    const isAuth = getState().auth.isAuth;
    if (isAuth) {
        try {
            const array: any = [];
            await app
                .firestore()
                .collection("users")
                .doc(userId)
                .collection("tasks")
                .get()
                .then(function (querySnapshot) {
                    try {
                        querySnapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            const task = {
                                keyFirebase: doc.id,
                                ...doc.data(),
                            };
                            array.push(task);
                        });
                    } catch (e) {
                        console.log(e.message);
                    }
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
    } else {
        AuthUser();
    }
};

// deleting the task from an array and on a server
export const DeleteTaskThunk = (id: number, keyFirebase: string) => async (
    dispatch: DispatchType,
    getState: () => AppStoreReducer
) => {
    const userId: any = getState().auth.user.userId;
    dispatch(blockButton(id));
    try {
        await dispatch(deleteTask(id));
        await app
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("tasks")
            .doc(keyFirebase)
            .delete();
    } catch (e) {
        dispatch(SetMessage(e.message, "error"));
    }
    dispatch(blockButton(id));
};

// ading task to server and to current tasks array
export const AddTaskThunk = (
    text: string,
    status: string,
    settedTime: string | null,
    settedDate: string | null,
    priority: string | null
) => async (dispatch: DispatchType, getState: () => AppStoreReducer) => {
    const userId: any = getState().auth.user.userId;
    const sortedByIdTasksArray = getState().tasks.TasksArray.sort(function (
        a,
        b
    ) {
        return a.id - b.id;
    });
    const newId =
        getState().tasks.TasksArray.length === 0
            ? 1
            : +sortedByIdTasksArray[sortedByIdTasksArray.length - 1].id + +1;
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
        priority: priority,
        text: text,
        status: status || "new",
        prevStatus: null,
        settedTime: settedTime || null,
        settedDate: settedDate || null,
    };

    await dispatch(blockButton("addTask"));
    try {
        dispatch(Loading());
        await app
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("tasks")
            .add(task);
        await dispatch(GetTasksThunk());
        dispatch(Loading());
    } catch (e) {
        dispatch(SetMessage(e.message, "error"));
    }
    dispatch(blockButton("addTask"));
};

// updating the task
export const UpdateTaskThunk = (
    text: string,
    status: string,
    id: number,
    date: string,
    newSettedDate: string | null,
    newSettedTime: string | null,
    priority: string | null,
    keyFirebase?: string
) => async (dispatch: DispatchType, getState: () => AppStoreReducer) => {
    const userId: any = getState().auth.user.userId;
    const task = {
        keyFirebase: keyFirebase,
        id: id,
        data: date,
        priority: priority || "",
        text: text,
        status: status || "new",
        prevStatus: status || "new",
        settedDate: newSettedDate,
        settedTime: newSettedTime,
    };
    await dispatch(blockButton("editTask"));
    if (task) {
        try {
            await app
                .firestore()
                .collection("users")
                .doc(userId)
                .collection("tasks")
                .doc(keyFirebase)
                .update(task);
            await dispatch(updateTask(task));
        } catch (e) {
            dispatch(SetMessage(e.message, "error"));
        }
    }

    dispatch(blockButton("editTask"));
};

export default TaskReducer;
