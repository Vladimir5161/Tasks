import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "./tasks.css";
import { DeleteTaskThunk, filterArray } from "../../../store/TaskReducer";
import AddTaskButton from "../../CommonComponents/AddTaskButton";
import AddTask from "./AddTask";
import Filter from "./Filter";
import Preloader from "../../CommonComponents/Preloader";
import TaskItemContainer from "./TaskItemContainer";

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
        let [addTaskPanel, setAddTaskPanel] = useState("addTaskPanel");
        if (loading) {
            return <Preloader />;
        }
        return (
            <>
                {isAuth ? (
                    <div className={classes.root}>
                        <AddTaskButton
                            AddTaskFunc={AddTaskFunc}
                            setAddTaskPanel={setAddTaskPanel}
                            addTaskPanel={addTaskPanel}
                        />
                        <div style={{ position: "relative", top: "-100px" }}>
                            <Filter filterArray={filterArray} />
                        </div>
                        <div className={addTaskPanel}>
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
                                    settedTime,
                                    settedDate,
                                }) => (
                                    <div key={id}>
                                        <TaskItemContainer
                                            EditButtonFunc={EditButtonFunc}
                                            id={id}
                                            text={text}
                                            priority={priority}
                                            status={status}
                                            keyFirebase={keyFirebase}
                                            data={data}
                                            DeleteTaskThunk={DeleteTaskThunk}
                                            editTask={editTask}
                                            DoneIdArray={DoneIdArray}
                                            BlockedButtonArray={
                                                BlockedButtonArray
                                            }
                                            settedTime={settedTime}
                                            settedDate={settedDate}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ) : null}
            </>
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
