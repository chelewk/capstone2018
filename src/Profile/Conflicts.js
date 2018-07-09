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
              Conflict 1
              <Typography component="p">
                Room: 256 <br/>
                Submitter: Dr. Paul D Wiedemeier
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
            Conflit 1
            <Typography component="p">
              Room: 215 <br/>
              Submitter: Dr. Jose Cordova
            </Typography>
          </Paper>
          </Button>

          <Button>
          <Paper className={classes.paper} elevation={4}>
            Conflict 2
            <Typography component="p">
              Room: 320 <br/>
              Submitter: Dr. Lon Smith
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