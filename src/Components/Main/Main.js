import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tasks from "./Tasks/Tasks";
import LoginPage from "./Login/LoginPage";
import { connect } from "react-redux";
import { GetTasksThunk, AuthUser } from "../../store/TaskReducer";

const Main = ({ value, isAuth, GetTasksThunk, AuthUser, TasksArray }) => {
    useEffect(() => {
        const uploadTasks = () => {
            GetTasksThunk();
            AuthUser();
        };
        uploadTasks();
    }, [TasksArray.length, GetTasksThunk, isAuth, AuthUser]);
    return (
        <div>
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
                    <Typography>{children}</Typography>
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
    isAuth: state.tasks.isAuth,
});
export default connect(mapStateToProps, { GetTasksThunk, AuthUser })(Main);
