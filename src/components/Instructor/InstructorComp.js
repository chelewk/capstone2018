import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import axios from 'axios';
import {connect} from 'react-redux';
import {compose} from 'redux';

import AssignRoles from './AssignRoles';
import DeadlinePage from '../deadline/DeadlinePage';
import InstructorList from './InstructorList';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class InstructorComp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: null,
            instructor:this.props.instructor
          };
    }
 
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    //console.log(this.state.instructor);
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>View Calendar</Typography>
            <Typography className={classes.secondaryHeading}>View Calendar of individual Instructor</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Assign Roles</Typography>
            <Typography className={classes.secondaryHeading}>
              Assign lead instructor
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
                <AssignRoles 
                    instructor={this.state.instructor}
                    courses={this.props.course}
                />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Instructor List</Typography>
            <Typography className={classes.secondaryHeading}>
              View the list of instructor
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <InstructorList />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <DeadlinePage/>
      </div>
    );
  }
}

InstructorComp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return {
              course:state.courses,
              instructor:state.instructor
    };
  };

  export default compose(
    withStyles(styles, {
      name: 'InstructorComp',
    }),
    connect(mapStateToProps),
  )(InstructorComp);

