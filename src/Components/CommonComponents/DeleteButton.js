import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Confirm from "./Confirm";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

export default function DeleteButton({ id, keyFirebase, setConfirm, handleClose, confirm, DeleteTask, deleteId, deleteKey }) {
    const classes = useStyles();

    return (
        <>
            {confirm ? <Confirm open={confirm} setConfirm={setConfirm} handleClose={handleClose} DeleteTask={DeleteTask} deleteId={deleteId} deleteKey={deleteKey} /> : null}
            <div
                className={`${classes.root} ${"deleteButtonTask"}`}
                onClick={(event) => {
                    event.stopPropagation();
                    setConfirm(true, id, keyFirebase)
                }}
                onFocus={(event) => {
                    event.stopPropagation();
                    setConfirm(true, id, keyFirebase)
                }}
            >
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </div>
        </>
    );
}
