import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function StatusSelect({ changeStatus, choseStatus }) {
    const classes = useStyles();

    return (
        <div style={{ position: "relative" }} className="statusTask">
            <FormControl className={classes.formControl}>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={choseStatus.status}
                    onChange={changeStatus}
                >
                    <MenuItem value={"new"}>new</MenuItem>
                    <MenuItem value={"in progress"}>in progress</MenuItem>
                    <MenuItem value={"paused"}>paused</MenuItem>
                    <MenuItem value={"done"}>done</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
