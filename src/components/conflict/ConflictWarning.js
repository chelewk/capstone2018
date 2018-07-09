import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import { withStyles } from "material-ui/styles";
import {connect} from 'react-redux';
import {compose} from 'redux';

const styles = theme => ({
  warning: {
    backgroundColor: "#F44336"
  }
});

class ConflictWarningDialoug extends React.Component {
  constructor(props){
    super(props);
      this.state = {
      open: props.open
      };
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  checkConflict=()=>{
    // if(this.props.conflict.length>0){
     const tempConflict = this.props.conflict[0];
    //   this.handleClickOpen();
    //   console.log(tempConflict);
    // }
    
    if(!Object.keys(tempConflict).length){
       console.log(this.props.conflict);
    }
     else{
      this.handleClickOpen();
     }
  };

  render() {
    const { classes } = this.props;
    //console.log(this.state);
    //console.log(this.props);
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className={classes.warning}>
            <DialogTitle id="alert-dialog-title">
              {"Conflict created"}
            </DialogTitle>
          </div>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConflictWarningDialoug.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state)=>{
  return {
            conflict: state.conflict
  };
};

export default compose(
  withStyles(styles, {
    name: 'ConflictWarningDialoug',
  }),
  connect(mapStateToProps),
)(ConflictWarningDialoug);

