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
interface AddButtonTypes {
    state: boolean,
    editState: () => void;
}

const AddButton: React.FC<AddButtonTypes> = ({ state, editState }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Fab
                color={state ? "secondary" : "primary"}
                aria-label="add"
                onMouseDown={(event) => { editState(); event.preventDefault() }}
            >
                <AddIcon />
            </Fab>
        </div>
    );
}

export default AddButton