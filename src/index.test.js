import React from "react";
import ReactDOM from "react-dom";
import MyApp from "./MyApp";

test("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MyApp />, div);
    ReactDOM.unmountComponentAtNode(div);
});

const originalError = console.error;

beforeAll(() => {
    console.error = jest.fn();
});

afterAll(() => {
    console.error = originalError;
});

