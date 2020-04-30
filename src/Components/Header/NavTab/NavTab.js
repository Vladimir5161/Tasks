import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const NavTabs = React.memo(({ handleChange, value }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <LinkTab
                        label="Today's Tasks"
                        href="/currentTasks"
                        {...a11yProps(0)}
                    />
                    <LinkTab
                        label="All Tasks"
                        href="/allTasks"
                        {...a11yProps(1)}
                    />
                    <LinkTab label="Basket" href="/trash" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
        </div>
    );
});

export default NavTabs;
