import React from "react";
import TabsWrappedLabel from "./NavTab/NavTab";
import { connect } from "react-redux";
import { Logout } from "../../store/AuthReducer";
import "./header.css";

const Header = ({ handleChange, value, Logout, isAuth, user }) => {
    return (
        <TabsWrappedLabel
            handleChange={handleChange}
            value={value}
            Logout={Logout}
            isAuth={isAuth}
            user={user}
        />
    );
};
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
});
export default connect(mapStateToProps, { Logout })(Header);
