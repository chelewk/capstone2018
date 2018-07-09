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
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import WarningIcon from 'material-ui-icons/Warning';
import AddIcon from 'material-ui-icons/Add';
import {connect} from 'react-redux';
import {compose} from 'redux';
import axios from 'axios';

import { startRemoveConflict } from '../actions/conflict';
import { startRemoveEvent } from '../actions/event';

const styles = theme => ({
  warning: {
    backgroundColor: "#F44336"
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Delete extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
          };
    }
    
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleDeleteRequest=()=>{
      console.log(`http://104.196.55.103:443/product/conflicts/deleteConflict.php?id=${this.props.data.conId}`);
      return (dispatch)=>{
          return axios({
             url: `http://104.196.55.103:443/product/conflicts/deleteConflict.php?id=${this.props.data.conId}`,
             method:'POST',
             headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'}
          })
          .then((response)=>{
              console.log(response);
          })

          .catch((response)=>{
              console.log(response);
          });
      }
  };

    handleClose = () => {
        // if(this.props.name==="Delete Event"){
        //     const eventId = this.props.data.eventId;
        //     console.log(eventId);
        //     this.props.dispatch(startRemoveEvent(eventId));
            
        // }

        // else if(this.props.name==="Delete Conflict"){
        //     const conId = this.props.data.conId; 
        //     console.log(conId);
        //     this.props.dispatch(startRemoveConflict(conId));
        // }
      this.setState({ open: false });
    };
    handleDelete=()=>{
      this.props.dispatch(this.handleDeleteRequest());
      console.log("Hit");
      this.setState({ open: false });
    };
  
    render() {
        const {classes,data}=this.props;
      console.log(data);
      return (
        <div>
        <Button variant={this.props.variant} color={this.props.color} onClick={this.handleClickOpen}>{this.props.name}</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth ={true}
            maxWidth = {'md'}
          >
            <div className = {classes.warning}
            >
              <DialogTitle id="alert-dialog-title">
              <h3> <WarningIcon />Are you sure you want to delete this conflict? </h3>
              </DialogTitle>
            </div>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                
              <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Course Name</TableCell>
                    <TableCell numeric>CRN</TableCell>
                    <TableCell >Instructor</TableCell>
                    <TableCell >Room Number</TableCell>
                    <TableCell >End Time</TableCell>
                    <TableCell >Start Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                      <TableRow key={data.conId}>
                        <TableCell>{data.courseName}</TableCell>
                        <TableCell numeric>{data.crn}</TableCell>
                        <TableCell >{data.instructor}</TableCell>
                        <TableCell >{data.roomNumber}</TableCell>
                        <TableCell >{data.startTime}</TableCell>
                        <TableCell >{data.endTime}</TableCell>
                      </TableRow>
                </TableBody>
              </Table>
            </Paper>
    
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleDelete} color="primary" autoFocus>
              {this.props.name}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }

Delete.propTypes = {
  classes: PropTypes.object.isRequired
};


export default compose(
  withStyles(styles, {
    name: 'Delete',
  }),
  connect(),
)(Delete);

