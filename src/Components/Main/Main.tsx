import React, { Suspense } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tasks from "./Tasks/Tasks";
import LoginPage from "./Login/LoginPage";
import { connect } from "react-redux";
import Preloader from "../CommonComponents/Preloader";
import { AppStoreReducer } from "../../store/rootReducer";

const Alert = React.lazy(() => import("../CommonComponents/Alert"))

interface MainTypes {
    value: number,
    message: string,
    Authorized: boolean,
    loading: boolean,
}

const Main: React.FC<MainTypes> = ({ value, message, Authorized, loading }) => {
    if (loading) {
        return <Preloader />;
    }
    if (Authorized === false) {
        return (
            <main>
                <TabPanel value={value} index={0}>
                    <LoginPage />
                </TabPanel>
                <TabPanel value={value} index={1} style={{ marginTop: "50px" }}>
                    You are not logged in, please log in to see your tasks or
                    create an account
                </TabPanel>
            </main>
        );
    } else
        return (
            <main>
                {message === null ? null : <Suspense fallback={<Preloader />}> <Alert /></Suspense>}
                <TabPanel value={value} index={0}>
                    <LoginPage />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Tasks />
                </TabPanel>
            </main>
        );
};


interface TabPanelTypes {
    children: any,
    value: number,
    index: number,
    other?: any
    style?: any
}
const TabPanel = (props: TabPanelTypes) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
            style={{ padding: "35px;" }}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={"div"} className="mainBlockStyle">
                        {children}
                    </Typography>
                </Box>
            )}
        </div>
    );
}

const mapStateToProps = (state: AppStoreReducer) => ({
    TasksArray: state.tasks.TasksArray,
    isAuth: state.auth.isAuth,
    message: state.alert.message,
    Authorized: state.authorized.Authorized,
    loading: state.tasks.loading,
});
export default connect(mapStateToProps)(Main);
