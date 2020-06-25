import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

function ConfirmSave({ open, handleSave }) {


    return (
        <div style={{ position: "fixed" }}>
            <Dialog
                open={open}
                onClose={(event) => { event.stopPropagation(); handleSave() }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are  you sure you want to save?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => { event.stopPropagation(); handleSave(false) }} color="primary">
                        Disagree
          </Button>
                    <Button onClick={(event) => { event.stopPropagation(); handleSave(true) }} color="primary" autoFocus>
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



export default ConfirmSave
