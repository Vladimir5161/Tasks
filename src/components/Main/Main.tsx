import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tasks from "./Tasks/Tasks";
import LoginPage from "./Login/LoginPage";
import { connect } from "react-redux";

import { AppStoreReducer } from "../../store/rootReducer";
import { Button } from "@material-ui/core";
import ReadMe from "../CommonComponents/ReadMe";

interface MainTypes {
    value: number;
    authorized: boolean;
    setCreateOrLog: (value: boolean) => void;
    isAuth: boolean;
}

const Main: React.FC<MainTypes> = ({
    value,
    authorized,
    setCreateOrLog,
    isAuth,
}) => {
    let [readMe, openReadMe] = React.useState(false);
    if (!authorized || !isAuth) {
        return (
            <main>
                <TabPanel value={value} index={0}>
                    <LoginPage setCreateOrLog={setCreateOrLog} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <p>
                        You are not logged in, please log in to see your tasks
                        or create an account
                    </p>
                    <Button
                        style={{
                            boxShadow: "0 0 2px 2px grey",
                            marginTop: "20px",
                        }}
                        onMouseDown={() => {
                            openReadMe(true);
                        }}
                    >
                        Read Me
                    </Button>
                    {readMe ? <ReadMe openReadMe={openReadMe} /> : null}
                </TabPanel>
            </main>
        );
    } else
        return (
            <main>
                <TabPanel value={value} index={0}>
                    <LoginPage setCreateOrLog={setCreateOrLog} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Tasks />
                </TabPanel>
            </main>
        );
};

interface TabPanelTypes {
    children: any;
    value: number;
    index: number;
    other?: any;
    style?: any;
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
};

const mapStateToProps = (state: AppStoreReducer) => ({
    tasksArray: state.tasks.TasksArray,
    isAuth: state.auth.isAuth,
    authorized: state.authorized.Authorized,
});
export default connect(mapStateToProps)(Main);
