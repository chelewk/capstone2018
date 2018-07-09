import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

function Deadline(props) {

  
    return (
        <div>
        <Dialog
          open={props.open}
          onClose={props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert!!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"><p>
              Sorry! Your selected date was out of range set by the Admin.
              The deadlines are:</p><p>
              Start: {props.start}</p><p>
              End: {props.end}</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="primary" autoFocus>
              Change Date
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default Deadline;