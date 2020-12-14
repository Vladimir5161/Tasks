import React, { useEffect, Suspense } from "react";
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
    message: string;
}

const Alert = React.lazy(() => import("./Components/CommonComponents/Alert"));

const App: React.FC<AppTypes> = ({
    isAuth,
    AuthUser,
    TasksArray,
    AuthorizationThunk,
    Loading,
    message,
    loading,
    Authorized,
}) => {
    useEffect(() => {
        const uploadTasks = () => {
            Loading();
            AuthUser();
            Loading();
        };
        uploadTasks();
    }, [TasksArray.length, isAuth, AuthUser, Loading, AuthorizationThunk]);

    const [createOrLog, setCreateOrLog] = React.useState(isAuth ? false : true); // if true it will show LOG IN in header first tab
    useEffect(() => {
        setTimeout(() => handleChange(`event`, 1), 0);
        setCreateOrLog(isAuth ? false : true);
    }, [isAuth]);

    const [value, setValue] = React.useState(isAuth ? 1 : 0);

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
                {message ? (
                    <Suspense fallback={<Preloader />}>
                        <Alert />
                    </Suspense>
                ) : null}
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
    message: state.alert.message,
    Authorized: state.authorized.Authorized,
});
export default connect(mapStateToProps, {
    AuthUser,
    Loading,
    AuthorizationThunk,
})(App);
