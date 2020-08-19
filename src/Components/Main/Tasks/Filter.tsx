import React, { useState } from "react";
import FilterSelect from "../../CommonComponents/FilterSelect";

interface FilterType {
    filterArray: (value: string) => void,
}

const Filter: React.FC<FilterType> = ({ filterArray }) => {
    let [value, setValue] = useState({ status: "" })

    const handleChange = (event: any) => {
        setValue(event.target.value);
        debugger;
        if (event.target.value !== null) {
            filterArray(event.target.value);
        } else return null;
    };
    return <FilterSelect handleChange={handleChange} value={value} />;
};
export default Filter;
