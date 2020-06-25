import React from "react";
import TaskItem from "./TaskItem";
import Enzyme, { mount, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";


Enzyme.configure({ adapter: new Adapter() });


test("props which we throw to component should be in it", () => {
    const component = mount(
        <TaskItem
            text="some text"
            editTask={{ id: false }}
            id="1"
            taskPanel={[]}
            missed={{ id: false }}
            urgent={{ id: false }}
        />
    );
    console.log(component.prop("text"));
    expect(component.prop("text")).toBe("some text");
});



