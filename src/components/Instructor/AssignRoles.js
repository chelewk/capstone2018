import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Snackbar from '../Snackbar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
    button: {
    margin: theme.spacing.unit,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class AssignRoles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            instructor: "",
            courses:[]
          };
    }

  handleInstructorChange = event => {
    this.setState({ instructor: event.target.value });
  };

    handleCourseChange = event => {
    this.setState({ courses: event.target.value });
  };

  assignRoles=(cwid,crnName)=>{
    return axios({
        url: `http://104.196.55.103:443/product/leads/setLeads.php?id=${this.state.instructor}&courseNames=${crnName}`,
        method:'POST',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
    })
    .then((response)=>{
        console.log("Assigned Lead instructor");
    })
    .catch(()=>{
        console.log("Failed to Assign Lead Instructor");
    });
  };

  showSnackBar= ()=>{
    return (
      <Snackbar open= {true}/>
    );
  };

  handleOnClick=()=>{
          const crnName = this.state.courses.join();
          this.assignRoles(this.state.instructor,crnName);
  };

  courseOption=(courseName)=>{  
    return(
      <MenuItem value={courseName}>{courseName}</MenuItem>
    )
  };

  instructorOption=(instructor)=>{
    const instructorName = instructor.firstName+" "+ instructor.lastName;
    const instructorCwid = instructor.cwid;
    return(
      <MenuItem value={instructorCwid}>{instructorName}</MenuItem>
    )
  };

  render() {
    const { classes, theme } = this.props;
    const uniqueName = [...new Set( this.props.courses.map(obj => obj.courseName))];
    return (
        <Grid>
        <Row between="xs">
      <div className={classes.root}>
    <Col xs>
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="instructor">Select Instructor</InputLabel>
          <Select
            value={this.state.instructor}
            onChange={this.handleInstructorChange}
            inputProps={{
              name: 'instructor',
              id: 'instructor',
            }}
          >
          {this.props.instructor.map(this.instructorOption)}
          </Select>
        </FormControl>
        </Col>

        <Col xs={5}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Select Courses</InputLabel>
          <Select
            multiple
            value={this.state.courses}
            onChange={this.handleCourseChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
          {uniqueName.map(this.courseOption)}
          </Select>
        </FormControl>
        </Col>

        <Col xs={3} xsOffset={2}>
          <Button variant="raised" color="primary" className={classes.button} onClick={this.handleOnClick}>
        Assign roles
      </Button>
      {this.showSnackBar()}
      </Col>
      </div>
      </Row>
      </Grid>
    );
  }
}

AssignRoles.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AssignRoles);
