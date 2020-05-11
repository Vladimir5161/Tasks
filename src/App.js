import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { connect } from "react-redux";

function App({ isAuth }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        handleChange(`event`, 1);
    }, [isAuth]);
    return (
        <div className="App">
            <Header value={value} handleChange={handleChange} />
            <Main value={value} />
        </div>
    );
}
const mapStateToProps = (state) => ({
    isAuth: state.tasks.isAuth,
});
export default connect(mapStateToProps)(App);
