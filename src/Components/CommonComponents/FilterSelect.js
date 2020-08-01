import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
        position: 'absolute',
        right: 0,
        top: '20px',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function FilterSelect({ value, handleChange }) {
    const classes = useStyles();

    return (
        <>
            <FormControl
                className={classes.formControl}
            >
                <InputLabel
                    htmlFor="filter-native-simple"
                    style={{ fontWeight: "bold" }}
                >
                    Sort by
                </InputLabel>
                <Select
                    native
                    value={value.status}
                    onChange={handleChange}
                    inputProps={{
                        name: "filter",
                        id: "filter-native-simple",
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={"date"}>date</option>
                    <option value={"status"}>status</option>
                    <option value={"priority"}>priority</option>
                    <option value={"deadline"}>deadline</option>
                </Select>
            </FormControl>
        </>
    );
}
