import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { DefaultMessage } from "../../store/AlertReducer";
import { AppStoreReducer } from "../../store/rootReducer";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

interface AlertModalTypes {
    message: string | null;
    type: any;
    DefaultMessage: () => void;
    alertClass: string;
}

const AlertModal: React.FC<AlertModalTypes> = ({
    message,
    type,
    DefaultMessage,
    alertClass,
}) => {
    const classes = useStyles();
    let [open, setOpen] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            DefaultMessage();
        }, 10000);
    }, [DefaultMessage]);
    return (
        <div
            className={classes.root}
            style={{
                maxWidth: "1170px",
                margin: "0 auto",
                position: "absolute",
                top: "0",
            }}
        >
            <div className={alertClass}>
                <Collapse in={open} className="alertClass">
                    <Alert
                        severity={type}
                        action={
                            <IconButton
                                aria-label="message"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon
                                    fontSize="inherit"
                                    onMouseDown={() => DefaultMessage()}
                                />
                            </IconButton>
                        }
                    >
                        {message}
                    </Alert>
                </Collapse>
            </div>
        </div>
    );
};
const mapStateToProps = (state: AppStoreReducer) => ({
    message: state.alert.message,
    type: state.alert.type,
    alertClass: state.alert.alertClass,
});
export default connect(mapStateToProps, { DefaultMessage })(AlertModal);
