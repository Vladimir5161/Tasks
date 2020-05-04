import { WebApi } from "../api/api";
import { reset } from "redux-form";

const initialState = {
    TasksArray: [],
    BlockedButtonArray: [],
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
        default:
            return state;
    }
};

export const getTasks = (tasks) => ({ type: "GETTASKS", tasks });
export const deleteTask = (id) => ({
    type: "DELETETASK",
    id,
});
export const addTask = (task) => ({ type: "ADDTASK", task });
export const blockButton = (id) => ({ type: "BLOCKBUTTON", id });
export const updateTask = (task) => ({ type: "UPDATETASK", task });

export const GetTasksThunk = () => async (dispatch, getState) => {
    try {
        let responce = await WebApi.getTasks();
        let tasksArray = Object.entries(responce);
        tasksArray.map((i) => (i[1].keyFirebase = i[0]));
        dispatch(getTasks(Object.values(responce)));
    } catch {
        return "error";
    }
};
export const DeleteTaskThunk = (id, keyFirebase) => async (dispatch) => {
    try {
        dispatch(blockButton(id));
        await WebApi.deleteTask(keyFirebase);
        await dispatch(deleteTask(id));
        dispatch(blockButton(id));
    } catch {
        return "error";
    }
};
export const AddTaskThunk = (priority, text, status) => async (
    dispatch,
    getState
) => {
    const sortedByIdTasksArray = getState().tasks.TasksArray.sort(function (
        a,
        b
    ) {
        return a.id - b.id;
    });
    const newId = sortedByIdTasksArray.length - 1;

    const task = {
        id: newId,
        data: new Date().toLocaleString(),
        priority: priority || null,
        text: text,
        status: status || "new",
    };
    try {
        debugger;
        dispatch(blockButton("addTask"));
        await WebApi.addTask(task);
        await dispatch(addTask(task));
        dispatch(blockButton("addTask"));
        dispatch(reset("addTask"));
    } catch {
        return "error";
    }
};
export const UpdateTaskThunk = (
    priority,
    text,
    status,
    id,
    keyFirebase
) => async (dispatch, getState) => {
    const task = {
        keyFirebase: keyFirebase,
        id: id,
        data: new Date().toLocaleString(),
        priority: priority || null,
        text: text,
        status: status || "new",
    };
    try {
        debugger;
        dispatch(blockButton("updateTask"));
        await WebApi.updateTask(task);
        await dispatch(updateTask(task));
        dispatch(blockButton("updateTask"));
        dispatch(reset("updateTask"));
    } catch {
        return "error";
    }
};

export default TaskReducer;
