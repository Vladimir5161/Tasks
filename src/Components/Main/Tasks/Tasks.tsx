import React, { useState, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "./tasks.scss";
import { DeleteTaskThunk, filterArray } from "../../../store/TaskReducer";
import { setTaskPanel } from "../../../store/AlertReducer";
import AddTaskButton from "../../CommonComponents/AddTaskButton";
import Filter from "./Filter";
import Preloader from "../../CommonComponents/Preloader";
import TaskItemContainer from "./TaskItemContainer";
import { AppStoreReducer } from "../../../store/rootReducer";
import { TasksFCTypes } from "../../../types/types";
import Confirm from "../../CommonComponents/Confirm";

const AddTask = React.lazy(() => import("./AddTask"));

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
    user,
    loading,
    BlockedButtonArray,
    taskPanel,
    setTaskPanel,
  }) => {
    const classes = useStyles();
    let [addTask, changeAddTask] = useState(false);
    const AddTaskFunc = () => {
      addTask ? changeAddTask(false) : changeAddTask(true);
    };
    /// this code is responsible for showing modal window with questions - if you want to delete Task, and to delete it if yes
    let [confirm, setValuesForDeleting]: any = useState({
      value: false,
      deleteId: null,
      deleteKey: null,
    });
    const setConfirm = (
      value: boolean,
      id?: number | null,
      key?: string | null
    ) => {
      setValuesForDeleting({
        value: value,
        deleteId: id,
        deleteKey: key,
      });
    };
    //----------------------------------
    // function which sets animated css style to the item and then delete the task once animation finished
    const DeleteTask = async (iD: number, keyFirebase: string) => {
      setTaskPanel(iD);
      setTimeout(async () => {
        await DeleteTaskThunk(iD, keyFirebase);
        setTaskPanel(iD);
      }, 1100);
    };
    ///this will show or hide ADD TASK form
    let [addTaskPanel, setAddTaskPanel] = useState("addTaskPanel");
    if (loading) {
      return <Preloader />;
    }
    return (
      <>
        {isAuth ? (
          <div className={classes.root}>
            <div className="userInfo">
              <div className="userInfoName">
                Hi {user.name}, <p className="email">'{user.email}'</p>
              </div>
            </div>
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
                <Suspense fallback={<Preloader />}>
                  {" "}
                  <AddTask
                    changeAddTask={changeAddTask}
                    BlockedButtonArray={BlockedButtonArray}
                  />
                </Suspense>
              ) : null}
              {confirm.value ? (
                <Confirm
                  open={confirm.value}
                  setConfirm={setConfirm}
                  DeleteTask={DeleteTask}
                  deleteId={confirm.deleteId}
                  deleteKey={confirm.deleteKey}
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
                      id={id}
                      text={text}
                      priority={priority}
                      status={status}
                      keyFirebase={keyFirebase}
                      data={data}
                      BlockedButtonArray={BlockedButtonArray}
                      settedTime={settedTime}
                      settedDate={settedDate}
                      TasksArray={TasksArray}
                      setConfirm={setConfirm}
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
  taskPanel: state.alert.taskPanel,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  DeleteTaskThunk,
  filterArray,
  setTaskPanel,
})(Tasks);
