import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/rootReducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

function App({ isAuth }) {
    const [value, setValue] = React.useState(isAuth ? 1 : 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter>
                    <div className="App">
                        <Header value={value} handleChange={handleChange} />
                        <Main value={value} handleChange={handleChange} />
                    </div>
                </BrowserRouter>
            </React.StrictMode>
        </Provider>
    );
}

export default App;
