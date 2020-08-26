"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Switch_1 = require("@material-ui/core/Switch");
var Checkbox = function (_a) {
    var setState = _a.setState, state = _a.state;
    var handleChange = function (event) {
        setState({ showPass: event.target.checked });
    };
    return (react_1["default"].createElement("div", { style: { position: "absolute", left: "-57%", bottom: "0" } },
        react_1["default"].createElement(Switch_1["default"], { checked: state.showPass, onChange: handleChange, color: "primary", name: "showPass", inputProps: { "aria-label": "secondary checkbox" } })));
};
exports["default"] = Checkbox;
