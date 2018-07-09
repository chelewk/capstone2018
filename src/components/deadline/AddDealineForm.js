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
import moment from 'moment';
import {connect} from 'react-redux';
import {compose} from 'redux';

import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
//import Time from './TimePicker';

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

class AddDeadlineForm extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            year:moment(),
            fallStart:moment(),
            fallEnd:moment(),
            springEnd:moment(),
            springStart:moment()
        };
    }    

    onYearChange=(year)=>{
        this.setState(()=>({year}));
    };

    onFallStartChange=(fallStart)=>{
        this.setState(()=>({fallStart}));
    };

    onFallEndChange=(fallEnd)=>{
        this.setState(()=>({fallEnd}));
    };

    onSpringEndChange=(springEnd)=>{
        this.setState(()=>({springEnd}));
    };

    onSpringStartChange=(springStart)=>{
        this.setState(()=>({springStart}));
    };


    onSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.year 
            && !this.state.fallEnd 
            && !this.state.fallStart
            && !this.state.springEnd
            && !this.state.springStart ){
                this.setState(()=>({error:'Please provide all the necessary details'}));
            }
        else{
            this.setState(()=>({error:''}));
            this.setState({
                year:"",
                fallStart:"",
                fallEnd:"",
                springEnd:"",
                springStart:"",
                error:''
            });
            this.props.onSubmit({
                year:this.state.year.format("YYYY"),
                fallStart:this.state.fallStart.format("MM-D-YYYY"),
                fallEnd:this.state.fallEnd.format("MM-D-YYYY"),
                springStart:this.state.springStart.format("MM-D-YYYY"),
                springEnd:this.state.springEnd.format("MM-D-YYYY"),
            }); 
        }
    }

    render(){
        const { classes } = this.props;
  return (
    <Grid fluid className={classes.root}>
    <Paper className={classes.paper} elevation={4}>
    <form>
    <Row around='xs'>
        <Col xs={12}>
        <DatePicker
        value={this.state.year}
        onChange={this.onYearChange}
        openToYearSelection
      label="Choose Year"
        /> 
        </Col>
    
    </Row>
    <Row around="xs">
    <Col xs={4} xsOffset={2}>
       
        {this.state.error && <Typography component="p">
        {this.state.error}
      </Typography>}
      <DatePicker
      value={this.state.fallStart}
      onChange={this.onFallStartChange}
    label="Choose Fall Start"
      /> 
       
        </Col>
        <Col xs={4} xsOffset={2}>
        <DatePicker
        value={this.state.fallEnd}
        onChange={this.onFallEndChange}
      label="Choose Fall End"
        />
      </Col>
      </Row>

      <Row around="xs">
    <Col xs={4} xsOffset={2}>
       
        {this.state.error && <Typography component="p">
        {this.state.error}
      </Typography>}
      <DatePicker
      value={this.state.springStart}
      onChange={this.onSpringStartChange}
    label="Choose Spring Start"
      />
      

        </Col>
        <Col xs={4} xsOffset={2}>
        <DatePicker
        value={this.state.springEnd}
        onChange={this.onSpringEndChange}
      label="Choose Spring End"
        />

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

AddDeadlineForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AddDeadlineForm);

