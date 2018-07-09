import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function ConflictTable(props) {
  const { classes, data } = props;
  console.log(data);
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.originEventID}>
                <TableCell>{n.originCourseName}</TableCell>
                <TableCell numeric>{n.originCrn}</TableCell>
                <TableCell >{n.originInstructor}</TableCell>
                <TableCell >{n.originStartTime}</TableCell>
                <TableCell >{n.originEndTime}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

ConflictTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConflictTable);