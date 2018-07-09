import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import WarningIcon from 'material-ui-icons/Warning';
import ConflictTable from './CoflictTable';

const styles = theme => ({
  warning: {
    backgroundColor: "#F44336"
  },
  dialouge:{
    width:'600px',
    height:'500px'
  }
});


const Conflict = (props)=>{
  return(
      <div classNmae= {props.classes.dialouge}>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth ={true}
        maxWidth = {'md'}
      >
        <div className = {props.classes.warning}
        >
          <DialogTitle id="alert-dialog-title">
          <h3> <WarningIcon />Conflict created </h3>
          <p> This will create a conflict with the following event. </p>
          </DialogTitle>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The event you tried to create will have a conflict with following event:
            <ConflictTable data={props.conflict} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.findClose} color="primary">
            Change Room
          </Button>
          <Button onClick={props.createClose} color="primary" autoFocus>
            Create Conflict
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Conflict.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Conflict);
