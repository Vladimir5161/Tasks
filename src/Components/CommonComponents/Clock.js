import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from "@material-ui/pickers";

export default function Clock({ selectedTime, handleTimeChange, error }) {
    // The first commit of Material-UI

    // const rime = React.createRef();
    // console.log(rime);
    // rime.current.setAttribute("disabled", true);
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
                container
                justify="space-around"
                style={{ maxWidth: "300px", margin: "5px auto 0 auto" }}
            >
                <KeyboardTimePicker
                    margin="normal"
                    userSelect="none"
                    id="time-picker"
                    // ref={rime}
                    label="Time picker"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    KeyboardButtonProps={{
                        "aria-label": "change time",
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
