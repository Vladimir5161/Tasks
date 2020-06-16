import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/rootReducer";
import thunk from "redux-thunk";
import App from "./App";

const store = createStore(rootReducer, applyMiddleware(thunk));

function MyApp() {


    return (
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        </Provider>
    );
}

export default MyApp;

