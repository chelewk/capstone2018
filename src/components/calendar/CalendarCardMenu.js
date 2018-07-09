import React from "react";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVertIcon from "material-ui-icons/MoreVert";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";

const styles = theme => ({
  icon: {
    color: grey[50]
  }
});

class CalendarCardMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null
    };
  }
 

  handleClick = event => {
    this.setState({ 
        anchorEl: event.currentTarget,
      });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon className={classes.icon} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Print</MenuItem>
          <MenuItem onClick={this.handleClose}>Temp Menu Item</MenuItem>
        </Menu>
      </div>
    );
  }
}

CalendarCardMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CalendarCardMenu);
