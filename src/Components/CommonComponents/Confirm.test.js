import React from "react";
import Confirm from "./Confirm";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });


test("props which we throw to component should be in it", () => {
    const component = mount(
        <Confirm
            id="1"
            open={false}
        />
    );
    expect(component.prop("id")).not.toBe(undefined);
    expect(component.prop("open")).not.toBe(undefined);
});
