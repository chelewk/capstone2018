import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import AddIcon from 'material-ui-icons/Add';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { startAddCourse } from '../actions/courses';
import { startAddEvent } from '../actions/event';
import AddClassForm from './course/AddClassForm';
import AddEventForm from './event/AddEventForm';
import { startAddDeadline } from '../actions/deadline';
import AddDealineForm from './deadline/AddDealineForm';
import AddRoomForm from './AddRoomForm';
import { startAddRoom } from '../actions/room';

const styles = theme=>({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  displayForm=()=>{
    const link = this.props.pathname;
  
     if(link==='/events'){
      return(
        <AddEventForm 
        // onSubmit={(event)=>{
        //   this.props.dispatch(startAddEvent(event));
        // }}
      />
      );
    }

    if(link==='/deadline'){
      return(
        <AddDealineForm
        onSubmit={(deadline)=>{
          this.props.dispatch(startAddDeadline(deadline));
        }}
      />
      );
    }

    if(link==='/room'){
      return(
        <AddRoomForm
        onSubmit={(room)=>{
          this.props.dispatch(startAddRoom(room));
        }}
      />
      );
    }

  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button fab color="primary" className={classes.button}
        onClick={this.handleClickOpen}>
        <AddIcon />
       </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Add {this.props.pathname.substring(1)}
              </Typography>
              
            </Toolbar>
          </AppBar>
          
        {this.displayForm()}
          
        </Dialog>
      </div>
    );
  }
}

AddDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles, {
    name: 'AddDialog',
  }),
  connect(),
)(AddDialog);