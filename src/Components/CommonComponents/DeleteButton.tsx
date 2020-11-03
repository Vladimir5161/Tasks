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

interface DeleteButtonTypes {
    id: number;
    keyFirebase?: string;
    setConfirm: (confirm: boolean, id?: number, key?: string) => void;
}

const DeleteButton: React.FC<DeleteButtonTypes> = ({
    id,
    keyFirebase,
    setConfirm,
}) => {
    const classes = useStyles();

    return (
        <>
            <div
                className={`${classes.root} ${"deleteButtonTask"}`}
                onClick={(event) => {
                    event.stopPropagation();
                    setConfirm(true, id, keyFirebase);
                }}
                onFocus={(event) => {
                    event.stopPropagation();
                    setConfirm(true, id, keyFirebase);
                }}
            >
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </div>
        </>
    );
};

export default DeleteButton;
