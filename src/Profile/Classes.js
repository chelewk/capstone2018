import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    marginLeft: 'auto',
    width: 500,
    padding: 15,
    textAlign: 'left',
  }
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>SPRING 2018</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Button>
            <Paper className={classes.paper} elevation={4}>
              <Typography variant="headline" component="h3">
                CSCI 4060 - SOFTWARE ENGINEERING
              </Typography>
              <Typography component="p">
                TTR 12:30PM - 1:45PM HMPH 316 <br />
                INSTRUCTOR: DR. LON SMITH
              </Typography>
            </Paper>
          </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>FALL 2017</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Button>
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="headline" component="h3">
              CSCI 3030 - INTERNET PROGRAMMING
            </Typography>
            <Typography component="p">
              MW 9:30AM - 10:45AM HMPH 203 <br />
              INSTRUCTOR: DR. PAUL D. WIEDEMEIER
            </Typography>
          </Paper>
          </Button>

          <Button>
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="headline" component="h3">
              CSCI 4012 - COMPUTER ARCHITECTURE
            </Typography>
            <Typography component="p">
              TTR 12:30PM - 1:45PM HMPH 308 <br />
              INSTRUCTOR: DR. VIRGINIA EATON
            </Typography>
          </Paper>
          </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);