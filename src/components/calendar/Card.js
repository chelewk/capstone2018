import React from "react";
import PropTypes from "prop-types";
import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
import CalendarCardMenu from "./CalendarCardMenu";
import List, { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { grey, indigo } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import Modal from 'material-ui/Modal';
import moment from 'moment';
import {
  Clear,
  AccessTime,
  Event,
  Subject,
  Lock,
  LockOpen,
  Room,
} from "material-ui-icons";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  cardActions: {
    display: "flex",
    marginLeft: "auto"
  },
  cardContentText: {
    position: "relative"
  },
  details: {
    backgroundColor: indigo[300],
    display: "flex",
    flexDirection: "column"
  },
  icon: {
    color: grey[500],
    position: "absolute",
    top: "8px",
    left: "0px"
  },
  iconButton: {
    color: grey[50]
  },
  /*dimensions: {
    minWidth: 150,
    maxWidth: 300
  },*/
  title: {
    color: grey[50],
    textAlign: "left",
    padding: "18px",
    fontSize: "110%",
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    //padding: theme.spacing.unit * 4,
  }
});

class CalendarCard extends React.Component {
  state = {
    dense: true,
    secondary: false
  };

  checkEventPrivacy = () => {
    const isPrivate = true; //fetch data here
    if (isPrivate) {
      return (
        <Lock /> //icon
      );
    }
    return (
      <LockOpen /> //icon
    );
  };

  render() {
    const { classes,open, close,event } = this.props;
    const { dense, secondary } = this.state;
    let title="";
    let notes="";
    let date = "";
    let time="";
    let room="";
    let createdBy="";
    let cardColor = "";
    if(event != null) {
      title = event.title+ ` (CRN: ${event.crn})`;
      date =  moment(event.date).format('dddd, MMMM ') + moment(event.date).format('DD');
      notes= event.notes;
      room = event.room;
      //time = moment(event.start).format('h:mm A - ') + moment(event.end).format('h:mm A');
      time = event.time;
      createdBy = event.createdBy;
      cardColor = event.color;
    }

    return (
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={close}
        >
          <div style={getModalStyle()} className={classes.paper}>
      <Paper  elevation={4} square={true}>
        <Card>
          <div style={{backgroundColor: cardColor}} className={classes.details}>
            <CardActions className={classes.cardActions}>
              <CalendarCardMenu/>
              <IconButton className={classes.iconButton}>
                <Clear onClick={()=>{this.props.close()}} />
              </IconButton>
            </CardActions>
            <Typography className={classes.title} variant="headline">
              {title}
            </Typography>
          </div>
          <CardContent>
            <List dense={dense}>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <AccessTime
                  />
                </ListItemIcon>
                <ListItemText
                  className={classes.cardContentText}
                  primary={time}
                  secondary={secondary ? "Temporary Secondary Data 0" : null} //Might not be necessary
                />
              </ListItem>
              <ListItem>
              <ListItemIcon className={classes.icon}>
                <Event //icon
                />
              </ListItemIcon>
              <ListItemText
                className={classes.cardContentText}
                primary={date}
                secondary={secondary ? "Temporary Secondary Data 2" : null} //Might not be necessary
              />
            </ListItem>
            <ListItem>
                <ListItemIcon className={classes.icon}>
                  <Room
                  />
                </ListItemIcon>
                <ListItemText
                  className={classes.cardContentText}
                  primary={room}
                  secondary={secondary ? "Temporary Secondary Data 0" : null} //Might not be necessary
                />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <Subject //icon
                  />
                </ListItemIcon>
                <ListItemText
                  className={classes.cardContentText}
                  primary={notes}
                  secondary={secondary ? "Temporary Secondary Data 1" : null}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon className={classes.icon}>
                  {this.checkEventPrivacy()}
                </ListItemIcon>
                <ListItemText
                  className={classes.cardContentText}
                  primary={createdBy}
                  secondary={secondary ? "Temporary Secondary Data 3" : null} //Might not be necessary
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Paper>
      </div>
        </Modal>
    );
  }
}

CalendarCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CalendarCard);
