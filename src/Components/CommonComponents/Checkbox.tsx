import React from "react";

interface CheckboxTypes {
    setState: any;
    state: {
        showPass: boolean;
    };
}

const Checkbox: React.FC<CheckboxTypes> = ({ setState, state }) => {
    const handleChange = (event: any) => {
        setState({ showPass: event.target.checked });
    };

    return (
        <div
            className="password"
            style={{
                width: "30px",
                position: "absolute",
                left: "-35px",
                top: "30px",
            }}
        >
            <input
                type="checkbox"
                id="checkbox"
                checked={state.showPass}
                onChange={handleChange}
                style={{ display: "none" }}
            />
            <label htmlFor="checkbox">
                <img
                    className={state.showPass ? "showPass" : "doNotShowPass"}
                    src={
                        state.showPass
                            ? "https://snipp.ru/demo/495/view.svg"
                            : "https://snipp.ru/demo/495/no-view.svg"
                    }
                    alt=""
                    style={{ height: "30px" }}
                />
            </label>
        </div>
    );
};

export default Checkbox;
