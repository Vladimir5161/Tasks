import { WebApi } from "../api/api";

const initialState = {
    TasksArray: [],
};

const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETTASKS":
            return {
                ...state,
                TasksArray: (state.TasksArray = action.tasks),
            };
        default:
            return state;
    }
};

export const getTasks = (tasks) => ({ type: "GETTASKS", tasks });

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

export default TaskReducer;
