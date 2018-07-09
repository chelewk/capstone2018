import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import HandleRequest from './HandleRequest';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },

  table: {
    minWidth: 700,
  },
});


function NewEvent(props) {
  const { classes, data } = props;
  //console.log(data);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>CourseName</TableCell>
            <TableCell numeric>CRN</TableCell>
            <TableCell >Instructor</TableCell>
            <TableCell >Room No</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Start Time</TableCell>
            <TableCell >End Time</TableCell>
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.reqId}>
                <TableCell>{n.courseName}</TableCell>
                <TableCell numeric>{n.crn}</TableCell>
                <TableCell >{n.instructor}</TableCell>
                <TableCell >{n.roomNumber}</TableCell>
                <TableCell >{n.date}</TableCell>
                <TableCell >{n.startTime}</TableCell>
                <TableCell >{n.endTime}</TableCell>
                <TableCell ><HandleRequest data={n} /></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

NewEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewEvent);