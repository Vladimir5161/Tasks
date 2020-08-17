import React from "react";
import Switch from "@material-ui/core/Switch";

export default function Checkbox({ setState, state }) {
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div style={{ position: "absolute", left: "-57%", bottom: "-0" }}>
            <Switch
                checked={state.showPass}
                onChange={handleChange}
                color="primary"
                name="showPass"
                inputProps={{ "aria-label": "secondary checkbox" }}
            />
        </div>
    );
}
