import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

interface StatusSelectTypes {
    choseStatus: {
        status: string
    },
    handleChange: (event: any) => void
}
const StatusSelect: React.FC<StatusSelectTypes> = ({ choseStatus, handleChange }) => {
    const classes = useStyles();

    return (
        <div style={{ position: "relative" }} className="statusTask">
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="status-native-simple">Status</InputLabel>
                <Select
                    native
                    value={choseStatus.status}
                    onChange={handleChange}
                    inputProps={{
                        name: "status",
                        id: "status-native-simple",
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={"new"}>new</option>
                    <option value={"paused"}>paused</option>
                    <option value={"in progress"}>in progress</option>
                    <option value={"done"}>done</option>
                </Select>
            </FormControl>
        </div>
    );
}


export default StatusSelect