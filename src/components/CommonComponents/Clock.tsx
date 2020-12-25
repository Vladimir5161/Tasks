import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

interface ClockTypes {
    handleTimeChange: (date: Date | Date[] | null) => void,
    currentTime?: null | Date[] | Date,
    animateClock: boolean
}


const Clock: React.FC<ClockTypes> = ({ handleTimeChange, currentTime, animateClock }) => {
    return (
        <div className={animateClock ? 'clockAnimated' : 'clock'}>
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
                        value={currentTime === null ? new Date() : currentTime}
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
        </div>
    );
}


export default Clock