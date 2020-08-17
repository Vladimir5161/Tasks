import React, { useEffect } from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { connect } from "react-redux";
import { AuthUser } from "./store/AuthReducer";
import { Loading } from "./store/TaskReducer";
import { AuthorizationThunk } from "./store/AuthorizationReducer";
import { TaskTypes } from "./types/types"
import { AppStoreReducer } from "./store/rootReducer";

interface AppTypes {
    isAuth: boolean,
    AuthUser: () => void,
    TasksArray: Array<TaskTypes>,
    AuthorizationThunk: () => void,
    Loading: () => void,
}

const App: React.FC<AppTypes> = ({ isAuth, AuthUser, TasksArray, AuthorizationThunk, Loading }) => {
    useEffect(() => {
        const uploadTasks = async () => {
            Loading();
            await AuthUser();
            await AuthorizationThunk();
            Loading();
        };
        uploadTasks();
    }, [TasksArray.length, isAuth, AuthUser, Loading, AuthorizationThunk]);

    useEffect(() => {
        setTimeout(() => handleChange(`event`, 1), 0);
    }, [isAuth]);

    const [value, setValue] = React.useState(isAuth ? 1 : 0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="App">
            <Header value={value} handleChange={handleChange} />
            <Main value={value} />
        </div>
    );
};

const mapStateToProps = (state: AppStoreReducer) => ({
    isAuth: state.auth.isAuth,
    TasksArray: state.tasks.TasksArray,
});
export default connect(mapStateToProps, {
    AuthUser,
    Loading,
    AuthorizationThunk,
})(App);
