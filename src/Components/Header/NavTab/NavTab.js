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

const NavTabs = React.memo(({ handleChange, value, Logout, isAuth, user }) => {
    const classes = useStyles();
    const label = isAuth ? `Hello ${user.name}` : "Log In";
    return (
        <div
            className={classes.root}
            style={{
                textTranform: "none",
                position: "relative",
                zIndex: "40",
            }}
        >
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    {isAuth && user.name !== null ? (
                        <LinkTab label={label} {...a11yProps(0)} />
                    ) : (
                        <LinkTab
                            label={label}
                            href="/login"
                            {...a11yProps(0)}
                        />
                    )}
                    <LinkTab
                        label="All Tasks"
                        href="/tasks"
                        {...a11yProps(1)}
                    />
                    {isAuth ? (
                        <LinkTab label="Log Out" onClick={() => Logout()} />
                    ) : null}
                </Tabs>
            </AppBar>
        </div>
    );
});

export default NavTabs;
