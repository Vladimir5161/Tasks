import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "./tasks.css";
import { DeleteTaskThunk, filterArray } from "../../../store/TaskReducer";
import AddTaskButton from "../../CommonComponents/AddTaskButton";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import Filter from "./Filter";
import Preloader from "../../CommonComponents/Preloader";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});

const ActionsInExpansionPanelSummary = React.memo(
    ({
        TasksArray,
        DeleteTaskThunk,
        isAuth,
        DoneIdArray,
        filterArray,
        loading,
        BlockedButtonArray,
    }) => {
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
        console.log(TasksArray);
        if (loading) {
            return <Preloader />;
        }
        return (
            <div>
                <div>
                    <Filter filterArray={filterArray} />
                </div>
                {isAuth ? (
                    <div className={classes.root}>
                        <AddTaskButton AddTaskFunc={AddTaskFunc} />
                        {addTask ? (
                            <AddTask
                                changeAddTask={changeAddTask}
                                BlockedButtonArray={BlockedButtonArray}
                            />
                        ) : null}
                        {TasksArray.map(
                            ({
                                id,
                                text,
                                priority,
                                data,
                                status,
                                keyFirebase,
                            }) => (
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
                                        DoneIdArray={DoneIdArray}
                                        BlockedButtonArray={BlockedButtonArray}
                                    />
                                </div>
                            )
                        )}
                    </div>
                ) : null}
            </div>
        );
    }
);
const mapStateToProps = (state) => ({
    TasksArray: state.tasks.TasksArray,
    isAuth: state.auth.isAuth,
    DoneIdArray: state.tasks.DoneIdArray,
    loading: state.tasks.loading,
    BlockedButtonArray: state.tasks.BlockedButtonArray,
});

export default connect(mapStateToProps, {
    DeleteTaskThunk,
    filterArray,
})(ActionsInExpansionPanelSummary);
