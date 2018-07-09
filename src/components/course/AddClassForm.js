import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
    root: theme.mixins.gutters({
      
    }),
    paper: {
      padding: theme.spacing.unit * 2,
    },
    button:{
      margin: theme.spacing.unit,
    },
  });

class AddClassForm extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            number:'',
            name:'',
            instructor:'',
            semester:'',
            year:''
        };
    }    

    onNumberChange=(e)=>{
        const number = e.target.value;
        this.setState(()=>({number}));
    };
    
    onNameChange=(e)=>{
        const name = e.target.value;
        this.setState(()=>({name}));
    };

    onInstructorChange=(e)=>{
        const instructor = e.target.value;
        this.setState(()=>({instructor}));
    };

    onSemesterChange=(e)=>{
        const semester = e.target.value;
        this.setState(()=>({semester}));
    };

    onYearChange=(e)=>{
        const year = e.target.value;
        this.setState(()=>({year}));
    };


    onSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.number 
            && !this.state.name 
            && !this.state.instructor
            && !this.state.semester
            && !this.state.year ){
                this.setState(()=>({error:'Please provide all the necessary details'}));
            }
        else{
            this.setState(()=>({error:''}));
            this.setState({
                number:'',
                name:'',
                instructor:'',
                semester:'',
                year:'',
                error:''
            });
            this.props.onSubmit({
                number:this.state.number,
                name:this.state.name,
                instructor:this.state.instructor,
                semester:this.state.semester,
                year:this.state.year
            }); 
        }
    }

    render(){
        const { classes } = this.props;
  return (
    <Grid fluid className={classes.root}>
    <Paper className={classes.paper} elevation={4}>
    <form>
    <Row around="xs">
    <Col xs={4} xsOffset={2}>
       
        {this.state.error && <Typography component="p">
        {this.state.error}
      </Typography>}
        
        <TextField
          id="number"
          label="Number"
          value={this.state.number}
          onChange={this.onNumberChange}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        </Col>
        <Col xs={4} xsOffset={2}>
        <TextField
        id="name"
        placeholder="Course Name"
        value={this.state.name}
          onChange={this.onNameChange}
        className={classes.textField}
        margin="normal"
      />
      </Col>
      </Row>

      <Row around="xs">
    <Col xs={4} xsOffset={2}>
       
        {this.state.error && <Typography component="p">
        {this.state.error}
      </Typography>}
        
      <TextField
      id="instructor"
      placeholder="Instructor Name"
      value={this.state.instructor}
        onChange={this.onInstructorChange}
      className={classes.textField}
      margin="normal"
    />
        </Col>
        <Col xs={4} xsOffset={2}>
        <Select
            value={this.state.semester}
            onChange={this.onSemesterChange}
            inputProps={{
              name:'Semester',
              id: 'semster',
            }}
          >
            <MenuItem value='Fall'>Fall</MenuItem>
            <MenuItem value='Spring'>Spring</MenuItem>
          </Select>
          <FormHelperText>Select Semester</FormHelperText>
          </Col>
          </Row>
          <Row around='xs'>
          <Col xs={4} xsOffset={2}>
          <Select
            value={this.state.year}
            onChange={this.onYearChange}
            inputProps={{
              name:'Year',
              id: 'year',
            }}
          >
            <MenuItem value='2018'>2018</MenuItem>
            <MenuItem value='2019'>2019</MenuItem>
            <MenuItem value='2020'>2020</MenuItem>
            <MenuItem value='2021'>2021</MenuItem>
          </Select>
          <FormHelperText>Select Year</FormHelperText>
      </Col>
      <Col xs={4} xsOffset={2}>
      <Button variant="raised" color="primary" className={classes.button} onClick={this.onSubmit}>
            Finished
    </Button>
      
      </Col>
      </Row>
      </form>
      </Paper>
    </Grid>
  );
}
}

AddClassForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AddClassForm);

