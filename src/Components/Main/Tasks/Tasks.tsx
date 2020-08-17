import React, { useState, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "./tasks.scss";
import { DeleteTaskThunk, filterArray } from "../../../store/TaskReducer";
import { setTaskPanel } from "../../../store/AlertReducer"
import AddTaskButton from "../../CommonComponents/AddTaskButton";
import Filter from "./Filter";
import Preloader from "../../CommonComponents/Preloader";
import TaskItemContainer from "./TaskItemContainer";
import { AppStoreReducer } from "../../../store/rootReducer";
import { TasksFCTypes } from "../../../types/types";

const AddTask = React.lazy(() => import("./AddTask"))

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});



const Tasks: React.FC<TasksFCTypes> = React.memo(
    ({
        TasksArray,
        DeleteTaskThunk,
        isAuth,
        filterArray,
        loading,
        confirm,
        BlockedButtonArray,
        deleteId,
        deleteKey,
        taskPanel,
        setTaskPanel
    }) => {
        const classes = useStyles();
        let [addTask, changeAddTask] = useState(false);
        const AddTaskFunc = () => {
            addTask ? changeAddTask(false) : changeAddTask(true);
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
                        <div style={{ position: "relative", top: "-80px" }}>
                            <Filter filterArray={filterArray} />
                        </div>
                        <div className={addTaskPanel}>
                            {addTask ? (
                                <Suspense fallback={<Preloader />}> <AddTask
                                    changeAddTask={changeAddTask}
                                    BlockedButtonArray={BlockedButtonArray}
                                /></Suspense>
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
                                                id={id}
                                                text={text}
                                                priority={priority}
                                                status={status}
                                                keyFirebase={keyFirebase}
                                                data={data}
                                                DeleteTaskThunk={DeleteTaskThunk}
                                                BlockedButtonArray={
                                                    BlockedButtonArray
                                                }
                                                settedTime={settedTime}
                                                settedDate={settedDate}
                                                confirm={confirm}
                                                TasksArray={TasksArray}
                                                deleteId={deleteId}
                                                deleteKey={deleteKey}
                                                taskPanel={taskPanel}
                                                setTaskPanel={setTaskPanel}
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
const mapStateToProps = (state: AppStoreReducer) => ({
    TasksArray: state.tasks.TasksArray,
    isAuth: state.auth.isAuth,
    loading: state.tasks.loading,
    BlockedButtonArray: state.tasks.BlockedButtonArray,
    confirm: state.alert.confirm,
    deleteId: state.alert.deleteId,
    deleteKey: state.alert.deleteKey,
    taskPanel: state.alert.taskPanel
});

export default connect(mapStateToProps, {
    DeleteTaskThunk,
    filterArray,
    setTaskPanel
})(Tasks);
