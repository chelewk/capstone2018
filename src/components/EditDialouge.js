import React from "react";
import Dialog from "material-ui/Dialog";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";

import EditEventForm from './event/EditEventForm';


const styles = theme=>({
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
  });

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


const displayForm=(pathname,row,onApplyChanges,onChange)=>{
    const link = pathname;    
     if(link==='/events'){
      return(
        <EditEventForm 
            data={row}
            onApplyChanges={onApplyChanges}
            onChange={onChange}       
        />
      );
    }

    if(link==='/conflict'){
      return(
        <EditEventForm 
            data={row}
            onApplyChanges={onApplyChanges}
            onChange={onChange}       
        />
      );
    }

};

const EditPopup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
  pathname
}) => {
    //console.log(row);
  return (
    <div>
      <Dialog />
      <Dialog
        fullScreen
        open={open}
        onClose={onCancelChanges}
        transition={Transition}
      >
        <AppBar
        className="appBar"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={onCancelChanges}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className="flex"
            >
              Edit {pathname.substring(1)}
            </Typography>
          </Toolbar>
        </AppBar>
        <br/>
        <br/>
        {displayForm(pathname, row,onApplyChanges, onChange )}
      </Dialog>
    </div>
  );
};

EditPopup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditPopup);
