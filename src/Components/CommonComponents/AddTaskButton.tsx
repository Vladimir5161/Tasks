import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

interface AddTaskButtonTypes {
    AddTaskFunc: () => void,
    setAddTaskPanel: (value: string) => void,
    addTaskPanel: string
}
const AddTaskButton: React.FC<AddTaskButtonTypes> = ({
    AddTaskFunc,
    setAddTaskPanel,
    addTaskPanel,
}) => {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
            onMouseDown={() => {
                addTaskPanel === "addTaskPanel"
                    ? setAddTaskPanel("addTaskPanelAnimation")
                    : setAddTaskPanel("addTaskPanel");
            }}
        >
            <Fab
                color="primary"
                aria-label="add"
                onMouseDown={() => AddTaskFunc()}
            >
                <AddIcon />
            </Fab>
        </div>
    );
}

export default AddTaskButton