import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

interface EditButtonTypes {
    EditButtonFunc: (id: number) => void;
    id: number;
}
const EditButton: React.FC<EditButtonTypes> = ({ EditButtonFunc, id }) => {
    const classes: any = useStyles();

    return (
        <div className="editButtonTask">
            <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => {
                    EditButtonFunc(id);
                }}
            >
                Edit
            </Button>
        </div>
    );
};

export default EditButton;
