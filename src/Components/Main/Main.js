import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tasks from "./Tasks/Tasks";
import LoginPage from "./Login/LoginPage";
import { connect } from "react-redux";
import { AuthorizationThunk } from "../../store/AuthorizationReducer";
import Alert from "../CommonComponents/Alert.js";
import Preloader from "../CommonComponents/Preloader";
import { AuthUser } from "../../store/AuthReducer";

const Main = ({
    value,
    isAuth,
    AuthUser,
    TasksArray,
    message,
    Authorized,
}) => {
    useEffect(() => {
        const uploadTasks = () => {
            AuthUser();
        };
        uploadTasks();
    }, [TasksArray.length, , isAuth, AuthUser]);
    if (Authorized === false) {
        return <Preloader />;
    } else
        return (
            <div>
                {message === null ? null : <Alert />}
                <TabPanel value={value} index={0}>
                    <LoginPage />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Tasks />
                </TabPanel>
            </div>
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
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={"div"}>{children}</Typography>
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
});
export default connect(mapStateToProps, { AuthUser })(Main);
