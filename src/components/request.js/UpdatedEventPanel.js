import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {connect} from 'react-redux';
import {compose} from 'redux';
import axios from 'axios';

import Newevent from './NewEvent';
import UpdatedEventTable from './UpdatedEventTable';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class UpdatedEventPanel extends React.Component {

    constructor(props){
        super(props);
        this.state={
            updateEvent:[]
        };
    };

    parseData=(event)=>{
        const origin = {
            status:"origin",
            id:event.originID,
            building:event.originBuilding,
            date:event.originDate,
            startTime:event.originStartTime,
            endTime:event.originEndTime,
            courseName:event.courseName,
            crn:event.crn,
            notes:event.originNotes,
            roomNumber:event.roomNumber,
            locationId:event.locationID,
            instructor:event.originInstructor
        }

        const update = {
            status:"update",
            reqID:event.reqID,
            eventID:event.originID,
            building:event.building,
            date:event.date,
            startTime:event.startTime,
            endTime:event.endTime,
            courseName:event.courseName,
            crn:event.crn,
            notes:event.notes,
            roomNumber:event.roomNumber,
            locationID:event.locationID,
            instructor:event.instructor
        }
        let tempArray=[];
        tempArray.push(origin);
        tempArray.push(update);
    
        return tempArray;
    };

    render(){
        const { classes,data } = this.props;
        console.log(data);
        return(
            <div>
            {
                this.props.data.map((event)=>{
                    return(
                        <div className={this.props.classes.root}>
                        <ExpansionPanel>
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Update request for {event.courseName} (CRN: {event.crn})</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                                <UpdatedEventTable data={this.parseData(event)} />
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </div>
                    );
                })
            }
            </div>
        );
    }
}

UpdatedEventPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
    withStyles(styles, {
      name: 'UpdatedEventPanel',
    }),
    connect(),
  )(UpdatedEventPanel);