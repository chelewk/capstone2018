import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Tooltip from 'material-ui/Tooltip';
import Dialog, {
  DialogTitle
} from "material-ui/Dialog";

import AddDialouge from './AddDialouge';

const styles = theme => ({
  button: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});



class AddButton extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open:false
    }
  }

handleClickOpen=()=>{
  //this.setState({open:true});
  this.dialougeOpen();
}

  dialougeOpen=()=>{
    console.log(this.props);
    return (
      <div>
      <AddDialouge pathname={this.props.pathname}/>
      </div>
    );
  };

 
render(){
  const { classes } = this.props;
  console.log(this.props);
  return (
    <div>
    <Tooltip title="Add">

    <Button fab color="primary" className={this.props.classes.button}
        onClick={this.handleClickOpen}>
        <AddIcon />
       </Button>
  </Tooltip>
    </div>
  );
}
  
};

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButton);