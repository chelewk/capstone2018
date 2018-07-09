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
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import moment from 'moment';
import {connect} from 'react-redux';
import {compose} from 'redux';

import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import RepeatEvent from './RepeatEvent';


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

class EditEventForm extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            course:this.props.data.courseName + "(CRN: "+ this.props.data.crn +" )",
            room:this.props.data.roomNumber,
            notes:this.props.data.notes,
            startTime: moment(this.props.data.startTime,"hh:m A"),
            endTime: moment(this.props.data.endTime,"hh:m A"),
            date: moment(this.props.data.date,"MM-D-YYYY"),
            open:false
        };
    }    

    onCourseChange=(e)=>{
        const course = e.target.value;
        this.setState(()=>({course}));
        const crn = this.props.course.find((course)=>{
          return (course.courseName===e.target.value);
        });
        this.props.onChange("crn",crn.crn);
    };
    
    onRoomChange=(e)=>{
        const room = e.target.value;
        this.setState(()=>({room}));
        const roomId = this.props.room.find((room)=>{
          return (room.number===e.target.value);
        });
        this.props.onChange("location",roomId.id);
    };

    onStartTimeChange=(time)=>{
        const startTime = time;
        this.setState(()=>({startTime}));
        this.props.onChange("startTime",startTime.format("hh:m A"));
    };

    onEndTimeChange=(time)=>{
      const endTime = time;
      this.setState(()=>({endTime}));
      this.props.onChange("endTime",endTime.format("hh:m A"));
  };

  onDateChange=(date)=>{
    this.setState(()=>({date}));
    this.props.onChange("date",date.format("MM-D-YYYY"));
};

onNotesChange=(e)=>{
  const notes= e.target.value;
  this.setState(()=>({notes}));
  this.props.onChange("notes",e.target.value);
};

  handleClickOpen=()=>{
    this.setState({open:true});
  };

  handleClose=()=>{
    this.setState({open:false});
  };

  courseOption=(course)=>{
    const courseName = course.courseName;
    return(
      <MenuItem value={course.crn}>{courseName}</MenuItem>
    );
  }

  roomOption=(room)=>{
    const roomNumber = room.number;
    return(
      <MenuItem value={roomNumber}>{roomNumber}</MenuItem>
    ) 
  };


  dialougeOpen=()=>{
    return(
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert!!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"><p>
              Sorry! Your selected date was out of range set by the Admin.
              The deadlines are:</p><p>
              Start: {this.props.deadline[0].springStart}</p><p>
              End: {this.props.deadline[0].springEnd}</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Change Date
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  disableEdit=()=>{
    const role = this.props.auth[0].role;
    const getLeadCourse = this.props.auth[0].canSchedule;
    if(getLeadCourse.length>0){
      if(role==='instructor' && getLeadCourse.includes(this.props.data.crn)){
        return false;
      }
      else{
        return true;
      }
    }
    
    else if(role==="admin"){
      return false;
    }
    else{
      return true;
    }
  };


    onSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.room 
            && !this.state.course 
            && !this.state.startTime
            && !this.state.endTime
            && !this.state.startDate ){
                this.setState(()=>({error:'Please provide all the necessary details'}));
            }
        else{
            this.setState(()=>({error:''}));
            this.setState({
                room:'',
                course:'',
                error:''
            });
         
          const fallStart=this.props.deadline[0].fallStart;
          const fallEnd=this.props.deadline[0].fallEnd;
          const springStart=this.props.deadline[0].springStart;
          const springEnd=this.props.deadline[0].springEnd;
          let checkDeadline = moment(event.date).isBetween(springStart,springEnd);
          if(checkDeadline){
          this.props.onApplyChanges(); 
          }
          else{
            this.handleClickOpen();
          }
        }
    }

    temp =()=>{
      return(
        <FormControl 
        className={classes.formControl}
        disabled={this.disableEdit()}
      >
        <InputLabel htmlFor="course">Course</InputLabel>
        <Select
        value={this.state.course}
        autoWidth
        onChange={this.onCourseChange}
        inputProps={{
          name:'Course',
          id: 'course',
        }}
      >
      {this.props.course.map(this.courseOption)}
      </Select>
      <FormHelperText>Select Course</FormHelperText>
      </FormControl>
      );
    }

    render(){
        const { classes, onApplyChanges} = this.props;
  return (
    <Grid fluid className={classes.root}>
    {this.dialougeOpen()}
    <Paper className={classes.paper} elevation={4}>
    <form>
    <Row around="xs">
    <Col xs={4} xsOffset={2}>
       
        {this.state.error && <Typography component="p">
        {this.state.error}
      </Typography>}

      <FormControl className={classes.formControl} disabled>
      <InputLabel htmlFor="name-disabled">Name</InputLabel>
      <Input id="name-disabled" value={this.state.course} onChange={this.onCourseChange} />
      <FormHelperText>Disabled</FormHelperText>
    </FormControl>
     
        </Col>
    
        <Col xs={4} xsOffset={2}>
        <FormControl 
          className={classes.formControl} 
          disabled={this.disableEdit()}>
        <InputLabel htmlFor="room">Room</InputLabel>
        <Select
        value={this.state.room}
        autoWidth
        onChange={this.onRoomChange}
        inputProps={{
          name:'Room',
          id: 'room',
        }}
      >
      {this.props.room.map(this.roomOption)}
      </Select>
      <FormHelperText>Select Room</FormHelperText>
      </FormControl>
      </Col>
      </Row>

      <Row around="xs">
    <Col xs={4} xsOffset={2}>
       
        {this.state.error && <Typography component="p">
        {this.state.error}
      </Typography>}
        
          <DatePicker
            value={this.state.date}
            onChange={this.onDateChange}
            disabled={this.disableEdit()}
          />

        </Col>
        <Col xs={4} xsOffset={2}>
        <TimePicker
          value={this.state.startTime}
          onChange={this.onStartTimeChange}
          disabled={this.disableEdit()}
          label="Choose a start time"  
        />
          </Col>
          </Row>
          <Row around='xs'>
          <Col xs={4} xsOffset={2}>
          <TimePicker
            value={this.state.endTime}
            onChange={this.onEndTimeChange}
            disabled={this.disableEdit()}
            label="Choose a end time"  
          />
      </Col>

      <Col xs={4} xsOffset={2}>
          <RepeatEvent startDate={this.state.date}/>
        
        </Col>
    
      
      </Row>
      <Row around='xs'>
        <Col xs={4} xsOffset={2}>
        <TextField
        id="multiline-static"
        label="Notes"
        multiline
        rows="4"
        defaultValue="Default Value"
        className={classes.textField}
        margin="normal"
        value={this.state.notes}
        onChange={this.onNotesChange}
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

EditEventForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state)=>{
    return {
              course:state.courses,
              room:state.room,
              deadline:state.deadline,
              auth:state.auth
    };
  };
  
  export default compose(
    withStyles(styles, {
      name: 'EditEventForm',
    }),
    connect(mapStateToProps),
  )(EditEventForm);

