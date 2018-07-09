import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ClassIcon from 'material-ui-icons/Book';
import RoomIcon from 'material-ui-icons/Room';
import RequestIcon from 'material-ui-icons/Assignment';
import BuildIcon from 'material-ui-icons/Build';
import SettingIcon from 'material-ui-icons/Settings';
import { MenuList, MenuItem } from 'material-ui/Menu';
import TodayIcon from 'material-ui-icons/Today';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Badge from 'material-ui/Badge';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 250,
    height: '75vh',
    backgroundColor: theme.palette.background.paper,
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.light,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class DrawerList extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      courseOpen: true,
      classOpen: true,
    };
    this.viewControl= this.viewControl.bind(this);
    this.courseView=this.courseView.bind(this);
    this.eventView = this.eventView.bind(this);
    this.roomView=this.roomView.bind(this);
    this.requestView=this.requestView.bind(this);
    this.calenderView=this.calenderView.bind(this);
    this.courseOpen=this.courseOpen.bind(this);
    this.classOpen=this.classOpen.bind(this);
  }
  

  courseOpen = () => {
    this.setState({ courseOpen: !this.state.courseOpen });
  };
  classOpen=()=>{
    this.setState({ classOpen: !this.state.classOpen });
  };

  viewControl=()=>{
    const user = this.props.auth[0];
    const role = user.role;
    const canSchedule = user.canSchedule;
    console.log(role);
    if(role==="admin"){
      return(
        <div>
                    <ListItem button component={Link} to='/calendar'>
                    <ListItemIcon>
                      <TodayIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Calendar" />
                  </ListItem>

                  <ListItem button component={Link} to='/conflict'>
                  <ListItemIcon>
                  <RequestIcon />
                  
                  </ListItemIcon>
                    <ListItemText inset primary="Conflict" />
                </ListItem>

                <ListItem button component={Link} to='/request'>
                  <ListItemIcon>
                  <RequestIcon />
                  
                  </ListItemIcon>
                    <ListItemText inset primary="Request" />
                </ListItem>

                <ListItem button component={Link} to='/events'>
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText inset primary="Events" />
              </ListItem>

              <ListItem button component={Link} to='/course'>
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText inset primary="Courses" />
            </ListItem>

            <ListItem button component={Link} to='/room'>
                    <ListItemIcon>
                      <RoomIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Room" />
                  </ListItem>

                  <ListItem button component={Link} to='/instructor'>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Admin Center" />
                </ListItem> 
        </div>
      );
    
    
  }

  else if (role==="instructor"){
    return(          
    <div>
              <ListItem button component={Link} to='/calendar'>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText inset primary="Calendar" />
            </ListItem>

            <ListItem button component={Link} to='/events'>
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText inset primary="Events" />
              </ListItem>

          <ListItem button component={Link} to='/course'>
          <ListItemIcon>
          <ClassIcon />
          </ListItemIcon>
          <ListItemText inset primary="Courses" />
          </ListItem>

          <ListItem button component={Link} to='/room'>
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText inset primary="Room" />
            </ListItem>
          </div>
    );
  }

  else if(role==='student'){
      return(
        <ListItem button component={Link} to='/calendar'>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText inset primary="Calendar" />
        </ListItem>
      );
    }

  };

  calenderView=()=>{
    return(
      <ListItem button component={Link} to='/calendar'>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText inset primary="Calendar" />
        </ListItem>
    )
  };

  requestView=()=>{
    return(
      <ListItem button>
          <ListItemIcon>
            <RequestIcon />
          </ListItemIcon>
          <ListItemText inset primary="Requests" />
        </ListItem>
    )
  };
  eventView=()=>{
    return(
      <ListItem button component={Link} to='/events'>
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText inset primary="Events" />
    </ListItem>
    )
  };

  courseView=()=>{
    return(
      <ListItem button component={Link} to='/course'>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText inset primary="Courses" />
    </ListItem>
    )
  };

  roomView=()=>{
    return(
      <MenuItem button component={Link} to='/room' className={classes.menuItem}>
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          <ListItemText inset primary="Room" />
        </MenuItem>
    )
  };


  render() {
    const { classes } = this.props;

    return (
      <MenuList>
      <List className={classes.root} subheader={<ListSubheader>All Labels</ListSubheader>}>
        
      {this.viewControl()}
      <MenuItem button onClick={this.courseOpen} className={classes.menuItem}>
          <ListItemIcon>
            <SettingIcon />
          </ListItemIcon>
          <ListItemText inset primary="Setting" />
          {this.state.courseOpen ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>

        <Collapse component="li" in={this.state.courseOpen} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Profile" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Setting" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      </MenuList>
    );
  }
}

DrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
  return {
            auth:state.auth
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(DrawerList);

//export default withStyles(styles)(DrawerList);
