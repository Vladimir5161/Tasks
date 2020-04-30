import React from "react";
import TabsWrappedLabel from "./NavTab/NavTab";

const Header = ({ handleChange, value }) => {
    return <TabsWrappedLabel handleChange={handleChange} value={value} />;
};

export default Header;
