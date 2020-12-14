import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

interface ReadMeTypes {
    openReadMe: (value: boolean) => void;
}

const ReadMe: React.FC<ReadMeTypes> = ({ openReadMe }) => {
    const classes = useStyles();
    let [open, setOpen] = useState(true);
    return (
        <div
            className={classes.root}
            style={{
                maxWidth: "1170px",
                margin: "0 auto",
            }}
        >
            <div className="alertClass">
                <Collapse in={open} className="alertClass readMeDiv">
                    <Alert
                        action={
                            <IconButton
                                aria-label="message"
                                color="inherit"
                                size="medium"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon
                                    fontSize="inherit"
                                    onMouseDown={() => openReadMe(false)}
                                />
                            </IconButton>
                        }
                    >
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontWeight: "bold" }}>
                                Main technology stack:
                            </div>
                            <p>- React</p> <p>- Typescript</p> <p>- Redux</p>{" "}
                            <p>- FirebaseDB</p> <p>- Formik</p>
                            <p>- Material UI</p>
                        </div>{" "}
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontWeight: "bold" }}>
                                Possibilities:
                            </div>
                            <p>- login/logout</p>
                            <p>- create account</p>
                            <p>- delete/add/edit tasks</p>
                            <p>
                                - delete/add/edit deadline
                                time/priority/status/text of the task{" "}
                            </p>
                            <p>- sort by date/priority/status/deadline</p>
                        </div>
                        <div style={{ fontWeight: "bold", textAlign: "left" }}>
                            Link to the GitHub with code:{" "}
                            <a
                                href="https://github.com/Vladimir5161/tasks/tree/master"
                                style={{ color: "blue" }}
                            >
                                GitHub
                            </a>
                        </div>
                    </Alert>
                </Collapse>
            </div>
        </div>
    );
};
export default ReadMe;
