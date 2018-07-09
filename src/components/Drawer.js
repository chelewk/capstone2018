import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Menu, { MenuItem } from 'material-ui/Menu';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import DrawerList from './DrawerList';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import CourseView from './course/CourseView';
import ConflictView from './conflict/ConflictView';
import RoomView from './RoomView';
import CalendarView from './calendar/CalendarView';
import EventsView from './event/EventsView';
import DeadlineView from './deadline/DeadlineView';
import {logOut} from '../actions/auth';
import {history} from "../routers/AppRouter";
import InstructorComp from './Instructor/InstructorComp';
import RequestLogView from './request.js/RequestLogView';

const drawerWidth = 201;

const styles = theme => ({
  root: {
    flexGrow:1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  flex: {
    flex: 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    height: 'calc(100% - 64px)',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 64px)',
    top: 64,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    auth:true,
    anchorEl: null,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout=()=>{
    this.setState({anchorEl:null});
    this.props.dispatch(logOut());
    history.push("/");
  };

  displayComponent=()=>{
    const link = this.props.location.pathname;
    const user = this.props.auth[0];
    const role = user.role;
    //console.log(role);
    if(role==='admin'){
      if(link==='/course'){
        return(
          <CourseView pathname = {link}/>
        );
      }

      if(link==='/request'){
        return(
          <RequestLogView pathname = {link}/>
        );
      }
  
      if(link==='/room'){
        return(
          <RoomView pathname = {link}/>
        );
      }

        if(link==='/events'){
          return(
            <EventsView pathname = {link}/>
          );
        }

        if(link==='/conflict'){
          return(
            <ConflictView pathname = {link}/>
          );
        }
        if(link==='/calendar'){
          return(
            <CalendarView/>
          );
        }
        if(link==='/instructor'){
          return(
            <InstructorComp/>
          );
        }

        if(link==='/deadline'){
          return(
            <DeadlineView pathname={link}/>
          );
        }
    }
    else if(role==='instructor'){
      if(link==='/course'){
        return(
          <CourseView pathname = {link}/>
        );
      }
  
      if(link==='/room'){
        return(
          <RoomView pathname = {link}/>
        );
      }

        if(link==='/events'){
          return(
            <EventsView pathname = {link}/>
          );
        }
        if(link==='/calendar'){
          return(
            <CalendarView/>
          );
        }

    }

    else if (role==='student'){
      if(link==='/calendar'){
        return(
          <CalendarView/>
        );
      }
    }
    
  };

  render() {
    const { classes, theme } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
  
    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
          Welcome {this.props.auth[0].firstName} {this.props.auth[0].lastName} !
        <Divider />
        <List><DrawerList/></List>
      </div>
    );


    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
        <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" noWrap className={classes.flex}>
            Nursing Calendar
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
                <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}

          
        </Toolbar>
      </AppBar>

          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
          {this.displayComponent()}
          </main>
          
        </div>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
  return {
            auth:state.auth
  };
};

export default compose(
  withStyles(styles, {
    withTheme: true,
  }),
  connect(mapStateToProps),
)(ResponsiveDrawer);
