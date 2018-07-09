import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import {compose} from 'redux';

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

const leadList =(canSchedule)=>{
   
  // console.log(canSchedule);
    return canSchedule;
};

function InstructorTable(props) {
  const { classes, instructor } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>CWID</TableCell>
            <TableCell >Lead Classes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instructor.map(n => {
            return (
              <TableRow key={n.cwid}>
                <TableCell>{n.firstName + " "+ n.lastName}</TableCell>
                <TableCell numeric>{n.cwid}</TableCell>
                <TableCell >{leadList(n.canSchedule)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

InstructorTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return {
              instructor:state.instructor
    };
  };
  
  export default compose(
    withStyles(styles, {
      name: 'InstructorTable',
    }),
    connect(mapStateToProps),
  )(InstructorTable);