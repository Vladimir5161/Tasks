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

interface PrioritySelectTypes {
    handleChange: (event: any) => void,
    choseState: {
        priority?: string | null
    }
}

const PrioritySelect: React.FC<PrioritySelectTypes> = ({ handleChange, choseState }) => {
    const classes = useStyles();

    return (
        <div style={{ position: "relative" }} className="priorityTask">
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="priority-native-simple">
                    Priority
                </InputLabel>
                <Select
                    native
                    value={choseState.priority}
                    onChange={handleChange}
                    inputProps={{
                        name: "priority",
                        id: "priority-native-simple",
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={"high"}>high</option>
                    <option value={"middle"}>middle</option>
                    <option value={"low"}>low</option>
                </Select>
            </FormControl>
        </div>
    );
}


export default PrioritySelect