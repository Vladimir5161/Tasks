import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

interface ConfirmTypes {
    open: boolean;
    Logout: () => Promise<void>;
    setConfirmLogOut: (confirm: boolean) => void;
}
const ConfirmLogOut: React.FC<ConfirmTypes> = ({
    open,
    Logout,
    setConfirmLogOut,
}) => {
    const handleClose = (value?: any) => {
        if (value) {
            setConfirmLogOut(false);
            Logout();
        } else {
            setConfirmLogOut(false);
        }
    };

    return (
        <div style={{ position: "fixed" }}>
            <Dialog
                open={open}
                onClose={(event: any) => {
                    event.stopPropagation();
                    handleClose();
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(event) => {
                            event.stopPropagation();
                            handleClose(false);
                        }}
                        color="primary"
                    >
                        Disagree
                    </Button>
                    <Button
                        onClick={(event) => {
                            event.stopPropagation();
                            handleClose(true);
                        }}
                        color="primary"
                        autoFocus
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmLogOut;
