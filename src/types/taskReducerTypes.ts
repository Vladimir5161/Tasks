import { TaskTypes } from "./types";

export interface LoadingTypes {
    type: "LOADING";
}
export interface getTasksTypes {
    type: "GETTASKS";
    tasks: Array<TaskTypes>;
}
export interface deleteTaskTypes {
    type: "DELETETASK";
    id: number;
}
export interface updateTaskTypes {
    type: "UPDATETASK";
    task: TaskTypes;
}
export interface addTaskTypes {
    type: "ADDTASK";
    task: TaskTypes;
}
export interface blockButtonTypes {
    type: "BLOCKBUTTON";
    id: number | string;
}
export interface filterArrayTypes {
    type: "FILTERARRAY";
    value: string;
}
