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

interface DeleteButtonTypes {
    id: number,
    keyFirebase?: string,
    setConfirm: (confirm: boolean, id?: number, key?: string) => void,
    confirm: boolean,
    DeleteTask: (deleteId: number, deleteKey: string) => void,
    deleteId: number | null,
    deleteKey?: string | null,
}

const DeleteButton: React.FC<DeleteButtonTypes> = ({ id, keyFirebase, setConfirm, confirm, DeleteTask, deleteId, deleteKey }) => {
    const classes = useStyles();

    return (
        <>
            {confirm ? <Confirm open={confirm} setConfirm={setConfirm} DeleteTask={DeleteTask} deleteId={deleteId} deleteKey={deleteKey} /> : null}
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


export default DeleteButton