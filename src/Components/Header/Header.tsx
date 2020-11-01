import React from "react";
import NavTab from "./NavTab/NavTab";
import { connect } from "react-redux";
import { Logout } from "../../store/AuthReducer";
import "./header.scss";
import { AppStoreReducer } from "../../store/rootReducer";
import { userTypes } from "../../types/authReducerTypes";

export interface HeaderTypes {
    handleChange: (event: any, newValue: number) => void;
    Logout: () => Promise<void>;
    isAuth: boolean;
    value: number;
    user: userTypes;
    style?: any;
    createOrLog: boolean;
}

const Header: React.FC<HeaderTypes> = ({
    handleChange,
    value,
    Logout,
    isAuth,
    user,
    createOrLog,
}) => {
    return (
        <NavTab
            handleChange={handleChange}
            value={value}
            Logout={Logout}
            isAuth={isAuth}
            user={user}
            createOrLog={createOrLog}
        />
    );
};
const mapStateToProps = (state: AppStoreReducer) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
});
export default connect(mapStateToProps, { Logout })(Header);
