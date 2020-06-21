import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


function Confirm({ open, DeleteTask, deleteId, deleteKey, setConfirm }) {
    const handleClose = (value) => {
        if (value) {
            setConfirm(false);
            DeleteTask(deleteId, deleteKey)
        } else {
            setConfirm(false);
        }
    };

    return (
        <div style={{ position: "fixed" }}>
            <Dialog
                open={open}
                onClose={(event) => { event.stopPropagation(); handleClose(); }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are  you sure you want to delete?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => { event.stopPropagation(); handleClose(false) }} color="primary">
                        Disagree
          </Button>
                    <Button onClick={(event) => { event.stopPropagation(); handleClose(true); }} color="primary" autoFocus>
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



export default Confirm
