import React from "react";
import Switch from "@material-ui/core/Switch";

interface CheckboxTypes {
    setState: any
    state: {
        showPass: boolean
    }
}

const Checkbox: React.FC<CheckboxTypes> = ({ setState, state }) => {
    const handleChange = (event: any) => {
        setState({ showPass: event.target.checked });
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

export default Checkbox