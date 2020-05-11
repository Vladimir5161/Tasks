import { WebApi } from "../api/api";
import { reset, reduxForm } from "redux-form";
import app from "../api/firebase";

const initialState = {
    TasksArray: [],
    BlockedButtonArray: [],
    DoneIdArray: [],
    isAuth: false,
    user: {
        name: null,
    },
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
        case "ISAUTH":
            return { ...state, isAuth: (state.isAuth = action.authStatus) };
        case "SETUSERNAME":
            return {
                ...state,
                user:
                    action.email !== "null"
                        ? { ...state.user, name: action.email }
                        : { ...state.user, name: null },
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
export const addTask = (task) => ({ type: "ADDTASK", task });
export const blockButton = (id) => ({ type: "BLOCKBUTTON", id });
export const updateTask = (task) => ({ type: "UPDATETASK", task });
export const setAuth = (authStatus) => ({ type: "ISAUTH", authStatus });
export const setUserName = (email) => ({ type: "SETUSERNAME", email });

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
    };
    const value = {
        id: id,
        status: status,
    };
    try {
        await dispatch(SetToDone(value));
        await WebApi.updateTask(task);
        debugger;
    } catch {
        return "error";
    }
};
export const SetToPrevStatusThunk = (
    id,
    keyFirebase,
    priority,
    text,
    data
) => async (dispatch, getState) => {
    debugger;
    const oldStatus = getState().tasks.TasksArray.filter(
        (item) => item.id === id
    );

    const task = {
        keyFirebase: keyFirebase,
        id: id,
        data: data,
        priority: priority || null,
        text: text || "",
        status: oldStatus.status || "new",
    };
    try {
        await WebApi.updateTask(task);
        await dispatch(SetToUnDone(id));
    } catch {
        return "error";
    }
};
export const GetTasksThunk = () => async (dispatch) => {
    try {
        let responce = await WebApi.getTasks();
        let tasksArray = Object.entries(responce);
        tasksArray.map((i) => (i[1].keyFirebase = i[0]));
        dispatch(getTasks(Object.values(responce)));
    } catch {
        return "error";
    }
};
export const GetItemThunk = (keyFirebase) => async (dispatch) => {
    try {
        let responce = await WebApi.getTaskItem(keyFirebase);
        dispatch(updateTask(responce));
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
    };
    try {
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
) => async (dispatch) => {
    const task = {
        keyFirebase: keyFirebase,
        id: id,
        data: new Date().toLocaleString(),
        priority: priority || null,
        text: text,
        status: status || "new",
    };
    try {
        dispatch(blockButton("updateTask"));
        await WebApi.updateTask(task);
        await dispatch(updateTask(task));
        dispatch(blockButton("updateTask"));
        dispatch(reset("updateTask"));
    } catch {
        return "error";
    }
};
export const CreateAccount = (email, password) => async (dispatch) => {
    await WebApi.createAcc(email, password);
    dispatch(reset("createUserForm"));
};
export const Login = (email, password) => async (dispatch) => {
    await WebApi.login(email, password);
    await dispatch(reset("loginForm"));
};

export const AuthUser = () => async (dispatch) => {
    app.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(setAuth(true));
            dispatch(setUserName(user.email));
        } else {
            dispatch(setAuth(false));
            dispatch(setUserName("null"));
        }
    });
};

export const Logout = () => async (dispatch) => {
    await WebApi.logout();
    console.log("user is logged out");
};
export default TaskReducer;
