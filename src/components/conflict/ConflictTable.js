import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import axios from 'axios';
import {connect} from 'react-redux';
import {compose} from 'redux';

import ConflictDialouge from './ConflictDialouge';

import EditEventForm from '../event/EditEventForm';
import {startRemoveConflict} from '../../actions/conflict';
import DeleteDialouge from '../DeleteDialouge';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  }
});


const getConData=(conflict)=>{
  const data={
    courseName:conflict.conCourseName,
    roomNumber:conflict.roomNum,
    notes:conflict.conNotes,
    location:conflict.location,
    startTime:conflict.conStartTime,
    endTime:conflict.conEndTime,
    date:conflict.date,
    crn:conflict.conCrn,
    conId:conflict.conID,
    instructor:conflict.conInstructor,
  };
  return data;
}

const getOriginalData=(conflict)=>{
  const data = {
    eventId: conflict.originEventID,
    location:conflict.location,
    courseName:conflict.originCourseName,
    roomNumber:conflict.roomNum,
    notes: conflict.originNotes,
    instructor:conflict.originInstructor,
    startTime:conflict.originStartTime,
    endTime:conflict.originEndTime,
    date:conflict.date,
    crn:conflict.originCrn
  };
  return data;
};


function ConflictTable(props) {
  const { classes, conflict } = props;
  //console.log(conflict);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell numeric>CRN</TableCell>
            <TableCell >Instructor</TableCell>
            <TableCell >End Time</TableCell>
            <TableCell >Start Time</TableCell>
            <TableCell >Resolve Conflict</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                <TableRow key={conflict.originEventID}>
                <TableCell>{conflict.originCourseName}</TableCell>
                <TableCell numeric>{conflict.originCrn}</TableCell>
                <TableCell >{conflict.originInstructor}</TableCell>
                <TableCell >{conflict.originStartTime}</TableCell>
                <TableCell >{conflict.originEndTime}</TableCell>
                <TableCell ></TableCell>
                </TableRow>

                <TableRow key={conflict.id}>
                <TableCell>{conflict.conCourseName}</TableCell>
                <TableCell numeric>{conflict.conCrn}</TableCell>
                <TableCell >{conflict.conInstructor}</TableCell>
                <TableCell >{conflict.conStartTime}</TableCell>
                <TableCell >{conflict.conEndTime}</TableCell>
                <TableCell ><DeleteDialouge  data ={getConData(conflict)} name={"Delete Conflict"} color={"secondary"} variant={"raised"}/></TableCell>
                </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

ConflictTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles, {
      name: 'ConflictTable',
    }),
    connect(),
  )(ConflictTable);