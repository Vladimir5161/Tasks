import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="App">
            <Header value={value} handleChange={handleChange} />
            <Main value={value} />
        </div>
    );
}

export default App;
