import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

export default function DeleteButton({
    id,
    keyFirebase,
    DeleteClass,
    DeleteTaskThunk,
}) {
    const classes = useStyles();

    return (
        <div
            className={`${classes.root} ${DeleteClass}`}
            onClick={(event) => {
                event.stopPropagation();
                DeleteTaskThunk(id, keyFirebase);
            }}
            onFocus={(event) => {
                event.stopPropagation();
                DeleteTaskThunk(id, keyFirebase);
            }}
        >
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </div>
    );
}
