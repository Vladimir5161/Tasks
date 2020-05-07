import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tasks from "./Tasks/Tasks";
import LoginPage from "./Login/LoginPage";

const Main = ({ value }) => {
    return (
        <div>
            <TabPanel value={value} index={0}>
                <LoginPage />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Tasks />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Blas
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

export default Main;
