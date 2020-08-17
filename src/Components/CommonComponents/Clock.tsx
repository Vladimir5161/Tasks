import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

interface ClockTypes {
    selectedTime: null | Date[] | Date,
    handleTimeChange: (date: Date | Date[] | null) => void,
}


const Clock: React.FC<ClockTypes> = ({ selectedTime, handleTimeChange }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
                container
                justify="space-around"
                style={{ maxWidth: "300px", margin: "5px auto 0 auto" }}
            >
                <TimePicker
                    margin="normal"
                    id="time-picker"
                    label="Deadline time"
                    value={selectedTime === null ? new Date() : selectedTime}
                    onChange={handleTimeChange}
                    // KeyboardButtonProps={{
                    //     "aria-label": "change time",
                    //     "userSelect": "none"
                    // }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}


export default Clock