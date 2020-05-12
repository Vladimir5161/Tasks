import { WebApi } from "../api/api";
import { reset } from "redux-form";
import { SetMessage } from "./AlertReducer";

const initialState = {
    TasksArray: [],
    BlockedButtonArray: [],
    DoneIdArray: [],
};

const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETTASKS":
            return {
                ...state,
                TasksArray: (state.TasksArray = action.tasks),
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

        default:
            return state;
    }
};
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

export const SetToDoneThunk = (
    id,
    keyFirebase,
    priority,
    text,
    status,
    data
) => async (dispatch) => {
    debugger;
    const task = {
        keyFirebase: keyFirebase,
        id: id,
        data: data,
        priority: priority || null,
        text: text,
        status: "done",
        prevStatus: status,
    };
    try {
        await WebApi.updateTask(task);
        let responce = await WebApi.getTaskItem(keyFirebase);
        dispatch(updateTask(responce));
        debugger;
    } catch {
        dispatch(SetMessage("something went wrong", "error"));
    }
};
export const SetToPrevStatusThunk = (
    id,
    keyFirebase,
    priority,
    text,
    data,
    prevStatus
) => async (dispatch, getState) => {
    debugger;

    const task = {
        keyFirebase: keyFirebase,
        id: id,
        data: data,
        priority: priority || null,
        text: text || "",
        status: prevStatus || "new",
        prevStatus: prevStatus,
    };
    try {
        await WebApi.updateTask(task);
        let responce = await WebApi.getTaskItem(keyFirebase);
        dispatch(updateTask(responce));
    } catch {
        dispatch(SetMessage("something went wrong", "error"));
    }
};
export const GetTasksThunk = () => async (dispatch) => {
    try {
        let responce = await WebApi.getTasks();
        let tasksArray = Object.entries(responce);
        tasksArray.map((i) => (i[1].keyFirebase = i[0]));
        dispatch(getTasks(Object.values(responce)));
    } catch {
        dispatch(SetMessage("something went wrong", "error"));
    }
};

export const DeleteTaskThunk = (id, keyFirebase) => async (dispatch) => {
    try {
        dispatch(blockButton(id));
        await WebApi.deleteTask(keyFirebase);
        await dispatch(deleteTask(id));
        dispatch(blockButton(id));
    } catch {
        dispatch(SetMessage("something went wrong", "error"));
    }
};
export const AddTaskThunk = (priority, text, status) => async (
    dispatch,
    getState
) => {
    debugger;
    const sortedByIdTasksArray = getState().tasks.TasksArray.sort(function (
        a,
        b
    ) {
        return a.id - b.id;
    });
    const newId =
        getState().tasks.TasksArray.length !== 0
            ? getState().tasks.TasksArray.length === 1
                ? getState().tasks.TasksArray[
                      getState().tasks.TasksArray.length - 1
                  ].id + 1
                : sortedByIdTasksArray[sortedByIdTasksArray.length - 1].id + 1
            : 1;

    const task = {
        id: newId,
        data: new Date().toLocaleString(),
        priority: priority || null,
        text: text,
        status: status || "new",
        prevStatus: null,
    };
    try {
        dispatch(blockButton("addTask"));
        await WebApi.addTask(task);
        await dispatch(addTask(task));
        dispatch(blockButton("addTask"));
        dispatch(reset("addTask"));
    } catch {
        dispatch(SetMessage("something went wrong", "error"));
    }
};
export const UpdateTaskThunk = (
    priority,
    text,
    status,
    id,
    keyFirebase
) => async (dispatch) => {
    const task = {
        keyFirebase: keyFirebase,
        id: id,
        data: new Date().toLocaleString(),
        priority: priority || null,
        text: text,
        status: status || "new",
        prevStatus: status || "new",
    };
    try {
        debugger;
        dispatch(blockButton("updateTask"));
        await WebApi.updateTask(task);
        await dispatch(updateTask(task));
        dispatch(blockButton("updateTask"));
        dispatch(reset("updateTask"));
    } catch {
        dispatch(SetMessage("something went wrong", "error"));
    }
};

export default TaskReducer;
