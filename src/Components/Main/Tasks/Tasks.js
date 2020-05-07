import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "./tasks.css";
import { GetTasksThunk, DeleteTaskThunk } from "../../../store/TaskReducer";
import AddTaskButton from "../../CommonComponents/AddTaskButton";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});

const ActionsInExpansionPanelSummary = React.memo(
    ({ TasksArray, GetTasksThunk, DeleteTaskThunk }) => {
        const classes = useStyles();
        let [DeleteClass, changeDeleteClass] = useState("deleteButtonTask");
        let [EditButtonClass, changeEditButton] = useState("editButtonTask");
        let [addTask, changeAddTask] = useState(false);
        let [editTask, changeEditTask] = useState([]);
        const AddTaskFunc = () => {
            addTask ? changeAddTask(false) : changeAddTask(true);
        };
        const EditButtonFunc = (ID) => {
            editTask.some((id) => id === ID)
                ? changeEditTask(editTask.filter((id) => id !== ID))
                : changeEditTask([...editTask, ID]);
        };
        useEffect(() => {
            const uploadTasks = () => {
                GetTasksThunk();
            };
            uploadTasks();
        }, [TasksArray.length, GetTasksThunk]);
        return (
            <div className={classes.root}>
                <AddTaskButton AddTaskFunc={AddTaskFunc} />
                {addTask ? <AddTask /> : null}
                {TasksArray.map(
                    ({ id, text, priority, data, status, keyFirebase }) => (
                        <div key={id}>
                            <TaskItem
                                EditButtonFunc={EditButtonFunc}
                                id={id}
                                text={text}
                                priority={priority}
                                status={status}
                                keyFirebase={keyFirebase}
                                DeleteClass={DeleteClass}
                                EditButtonClass={EditButtonClass}
                                data={data}
                                DeleteTaskThunk={DeleteTaskThunk}
                                editTask={editTask}
                            />
                        </div>
                    )
                )}
            </div>
        );
    }
);
const mapStateToProps = (state) => ({
    TasksArray: state.tasks.TasksArray,
});

export default connect(mapStateToProps, { GetTasksThunk, DeleteTaskThunk })(
    ActionsInExpansionPanelSummary
);
