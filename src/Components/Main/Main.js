import React, { Suspense } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tasks from "./Tasks/Tasks";
import LoginPage from "./Login/LoginPage";
import { connect } from "react-redux";
import Preloader from "../CommonComponents/Preloader";

const Alert = React.lazy(() => import("../CommonComponents/Alert"))

const Main = ({ value, message, Authorized, loading, confirm }) => {
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

function TabPanel(props) {
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
const mapStateToProps = (state) => ({
    TasksArray: state.tasks.TasksArray,
    isAuth: state.auth.isAuth,
    message: state.alert.message,
    Authorized: state.authorized.Authorized,
    loading: state.tasks.loading,
});
export default connect(mapStateToProps)(Main);
