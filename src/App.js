import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { connect } from "react-redux";

function App({ isAuth }) {
    const [value, setValue] = React.useState(isAuth ? 1 : 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        setTimeout(() => handleChange(`event`, 1), 0);
    }, [isAuth]);
    return (
        <div className="App">
            <Header value={value} handleChange={handleChange} />
            <Main value={value} />
        </div>
    );
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps)(App);
