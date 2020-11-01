import React, { useEffect } from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { connect } from "react-redux";
import { AuthUser } from "./store/AuthReducer";
import { Loading } from "./store/TaskReducer";
import { AuthorizationThunk } from "./store/AuthorizationReducer";
import { TaskTypes } from "./types/types";
import { AppStoreReducer } from "./store/rootReducer";
import Preloader from "./Components/CommonComponents/Preloader";

interface AppTypes {
    isAuth: boolean;
    AuthUser: () => void;
    TasksArray: Array<TaskTypes>;
    AuthorizationThunk: () => void;
    Loading: () => void;
    loading: boolean;
    Authorized: boolean;
}

const App: React.FC<AppTypes> = ({
    isAuth,
    AuthUser,
    TasksArray,
    AuthorizationThunk,
    Loading,
    loading,
    Authorized,
}) => {
    useEffect(() => {
        const uploadTasks = () => {
            Loading();
            AuthUser();
            AuthorizationThunk();
            Loading();
        };
        uploadTasks();
    }, [TasksArray.length, isAuth, AuthUser, Loading, AuthorizationThunk]);

    useEffect(() => {
        setTimeout(() => handleChange(`event`, 1), 0);
    }, [isAuth]);

    const [value, setValue] = React.useState(isAuth ? 1 : 0);
    const [createOrLog, setCreateOrLog] = React.useState(true); // if true it will show LOG IN in header first tab
    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    if (Authorized && !loading) {
        return (
            <div className="App">
                <Header
                    value={value}
                    handleChange={handleChange}
                    createOrLog={createOrLog}
                />
                <Main value={value} setCreateOrLog={setCreateOrLog} />
            </div>
        );
    } else {
        return <Preloader />;
    }
};

const mapStateToProps = (state: AppStoreReducer) => ({
    isAuth: state.auth.isAuth,
    TasksArray: state.tasks.TasksArray,
    loading: state.tasks.loading,
    Authorized: state.authorized.Authorized,
});
export default connect(mapStateToProps, {
    AuthUser,
    Loading,
    AuthorizationThunk,
})(App);
