import React, { useState } from "react";
import FilterSelect from "../../CommonComponents/FilterSelect";

const Filter = ({ filterArray }) => {
    let [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
        debugger;
        if (event.target.value !== null) {
            filterArray(event.target.value);
        } else return null;
    };
    return <FilterSelect handleChange={handleChange} value={value} />;
};
export default Filter;
