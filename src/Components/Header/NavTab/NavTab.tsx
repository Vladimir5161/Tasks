import React from "react";
import { HeaderTypes } from "../Header";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ConfirmLogOut from "../../CommonComponents/ConfirmLogOut";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { template } from "lodash";

function a11yProps(index: number) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`,
    };
}

function LinkTab(props: any) {
    return (
        <Tab
            onClick={(event: any) => {
                event.preventDefault();
                event.stopPropagation();
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

const NavTabs: React.FC<HeaderTypes> = React.memo(
    ({ handleChange, value, Logout, isAuth, user, createOrLog }) => {
        const classes = useStyles();
        const label = !createOrLog ? `Create Account` : "Log In";
        let [confirmLogOut, setConfirmLogOut] = React.useState(false);
        return (
            <div
                className={classes.root}
                style={{
                    textTransform: "none",
                    position: "relative",
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
                            <div
                                onClick={() => {
                                    setConfirmLogOut(true);
                                }}
                                style={{
                                    display: "grid",
                                    justifyContent: "space-between",
                                    gridTemplateColumns: "1fr 1fr",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "right",
                                        display: "block",
                                    }}
                                >
                                    Log Out
                                </div>
                                <LinkTab
                                    icon={<PersonPinIcon />}
                                    aria-label="person"
                                    disabled
                                    style={{ minWidth: "50px " }}
                                />
                            </div>
                        ) : null}
                    </Tabs>
                    <ConfirmLogOut
                        open={confirmLogOut}
                        setConfirmLogOut={setConfirmLogOut}
                        Logout={Logout}
                    />
                </AppBar>
            </div>
        );
    }
);

export default NavTabs;
