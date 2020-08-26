"use strict";
exports.__esModule = true;
var react_1 = require("react");
var FilterSelect_1 = require("../../CommonComponents/FilterSelect");
var Filter = function (_a) {
    var filterArray = _a.filterArray;
    var _b = react_1.useState({ status: "" }), value = _b[0], setValue = _b[1];
    var handleChange = function (event) {
        setValue(event.target.value);
        if (event.target.value !== null) {
            filterArray(event.target.value);
        }
        else
            return null;
    };
    return react_1["default"].createElement(FilterSelect_1["default"], { handleChange: handleChange, value: value });
};
exports["default"] = Filter;
