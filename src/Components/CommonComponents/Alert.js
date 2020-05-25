import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { DefaultMessage } from "../../store/AlertReducer";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

function AlertModal({ message, type, DefaultMessage }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        setTimeout(() => {
            DefaultMessage();
        }, 10000);
    }, [DefaultMessage, message]);
    if (message === null) {
        return null;
    } else
        return (
            <div
                className={classes.root}
                style={{
                    maxWidth: "1170px",
                    margin: "0 auto",
                }}
            >
                <Collapse
                    in={open}
                    style={{
                        width: "70%",
                        margin: "0 auto",
                        position: "fixed",
                        left: "0",
                        right: "0",
                        top: "35%",
                        zIndex: "100",
                        maxWidth: "700px"
                    }}
                >
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
        );
}
const mapStateToProps = (state) => ({
    message: state.alert.message,
    type: state.alert.type,
});
export default connect(mapStateToProps, { DefaultMessage })(AlertModal);
