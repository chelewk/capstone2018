import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { InputLabel } from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
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
import axios from 'axios';

import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import ConflictDialouge from './ConflictWarning';
import { addEvent } from '../../actions/event';
import Deadline from '../event/DeadlineDialouge';
import Conflict from '../event/ConflictDialouge';
import { startAddConflict } from '../../actions/conflict';

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

class AddConlfictForm extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            course:this.props.data.crn,
            location:this.props.data.location,
            notes:this.props.notes,
            startTime: moment(this.props.data.startTime,"hh:m A"),
            endTime: moment(this.props.data.endTime,"hh:m A"),
            date: moment(this.props.data.date,"MM-D-YYYY"),
            deadlineOpen:false,
            conflictOpen:false,
            tempConflict:[],
            cuid:0,
            courseName:this.props.data.courseName,
            roomNumber:this.props.data.roomNumber
        };
    } 

    getEvent=()=>{
      const event = {
        cuid:this.state.cuid,
        crn:this.state.course,
        location:this.state.location,
        startTime:this.state.startTime.format("hh:m A"),
        endTime:this.state.endTime.format("hh:m A"),
        date:this.state.date.format("MM-D-YYYY"),
        notes:this.state.notes,
        roomNumber:this.state.roomNumber,
        courseName:this.state.courseName
    };
    return event;
    };
    
     startAddEvent = (eventData={})=>{
        return (dispatch)=>{
            const{
                crn=0,
                location=0,
                startTime='',
                endTime='',
                date='',
                notes="",
                courseName="",
                roomNumber=0,  
                cuid=0  
            } = eventData;
            
            const event= {crn,location,startTime,endTime,date,notes,roomNumber,courseName};
            console.log(event);
            const test =  axios({
               url: `http://104.196.55.103:443/product/event/createEvent.php?crn=${crn}&cuid=${cuid}&location=${location}&startTime=${startTime}&endTime=${endTime}&date=${date}&notes=${notes}`,
               method:'POST',
               headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'}
            })
            .then((response)=>{
                if(response.data.status === 200){
                    dispatch(addEvent({
                        id:response.data.id,
                        ...event
                    }));
                    console.log("Conflict added");
                }
                
                else if(response.data.status === 409){
                    console.log("Conflict created");
                    this.setState({ conflictOpen: true });
                    const{
                        originEventID=0,
                        originInstructor='',
                        originStartTime='',
                        originEndTime='',
                        originCourseName='',
                        originCrn=''
                    }= response.data.data;
                    const tempConflictStore = {originEventID,originInstructor,originStartTime,originEndTime,originCourseName,originCrn};
                    const  tempConflict = [tempConflictStore];
                    this.setState(()=>({tempConflict}));
                }
            })
            .catch((response)=>{
                console.log(response);
            });
        }
    };


    onCourseChange=(e)=>{
        const course = e.target.value;
        this.setState(()=>({course}));
    };
    
    onRoomChange=(e)=>{
        const roomNumber = e.target.value;
        this.setState(()=>({roomNumber}));
    };

    onStartTimeChange=(time)=>{
        const startTime = time;
        this.setState(()=>({startTime}));
    };

    onEndTimeChange=(time)=>{
      const endTime = time;
      this.setState(()=>({endTime}));
  };

  onDateChange=(date)=>{
    this.setState(()=>({date}));
};

onNotesChange=(e)=>{
  const notes= e.target.value;
  this.setState(()=>({notes}));
};

  handleDeadlineClickOpen=()=>{
    this.setState({deadlineOpen:true});
  };

  handleDeadlineClose=()=>{
    this.setState({deadlineOpen:false});
  };

  handleCreateConflictClose = () => {
    const conflict={
      ...this.getEvent(),
      eventId: this.state.tempConflict[0].originEventID,
   };
  
   //console.log(conflict);
   this.setState({ conflictOpen: false });
   this.props.dispatch(startAddConflict(conflict));
  };

  handleFindConflictClose = () => {
    this.setState({ conflictOpen: false });
  };

  courseOption=(course)=>{

    const courseName = course.courseName+ "(CRN: "+ course.crn +" )";

    return(
      <MenuItem value={course.crn}>{courseName}</MenuItem>
    )
  }

  roomOption=(room)=>{
    const roomNumber = room.number;
    return(
      <MenuItem value={room.number}>{roomNumber}</MenuItem>
    );
  };

  selectableCourse = (courses)=>{
    const role = this.props.auth[0].role;
    const getLeadCourse = this.props.auth[0].canSchedule;
    if(getLeadCourse.length>0){
      let findCourseName = [];
      if(role==='instructor'){
        let array = [];
        for(var crn in getLeadCourse){
          for(var c in courses){
            if(courses[c].crn === getLeadCourse[crn]){
              array.push(courses[c]);
            }
          }
        }
        return array;
      }
    }

    else if(role==="admin"){
      return courses;
    }
  };

  conflictDialougeOpen =()=>{
    return(
      <Conflict
        open = {this.state.conflictOpen}
        createClose = {this.handleCreateConflictClose}
        conflict={this.state.tempConflict}  
        findClose={this.handleFindConflictClose}
      />
    );
  }

  deadlineDialougeOpen =()=>{
    return(
      <Deadline
        open = {this.state.deadlineOpen}
        close = {this.handleDeadlineClose}
        start= {this.props.deadline[0].springStart}
        end = {this.props.deadline[0].springEnd}  
      />
    );
  }

  getRoomId=()=>{
    const roomId= this.props.room.find((room)=>{
      return (room.number===this.state.roomNumber);
    });
    this.setState(()=>({location:roomId.id}));
    //return roomNumber;
  };

  getCourseName=()=>{
    const courseName = this.props.course.find((course)=>{
      return (course.crn===this.state.course);
    });
    this.setState(()=>({courseName:courseName.courseName}));
    //return courseName;
  };

  getCuid=()=>{
    const cuid = this.props.auth[0].cwid;
    this.setState(()=>({cuid}));
    //return cuid;
  };

  checkDeadline=(date)=>{
          const fallStart=this.props.deadline[0].fallStart;
          const fallEnd=this.props.deadline[0].fallEnd;
          const springStart=this.props.deadline[0].springStart;
          const springEnd=this.props.deadline[0].springEnd;
          let checkDeadline = moment(date).isBetween(springStart,springEnd);
          return checkDeadline;
  };

    onSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.room 
            && !this.state.course 
            && !this.state.startTimeS
            && !this.state.endTime
            && !this.state.startDate ){
                this.setState(()=>({error:'Please provide all the necessary details'}));
            }
        else{
            // this.setState(()=>({error:''}));
            // // this.setState({
            // //     room:'',
            // //     course:'',
            // //     error:''
            // // });
          this.getRoomId();
          this.getCourseName();
          this.getCuid();
          const event = this.getEvent();
          if(this.checkDeadline(event.date)){
           this.props.dispatch(this.startAddEvent(event));
           //console.log(event);
          }
          else{
            this.handleDeadlineClickOpen();
          }
        }
    }

    render(){
        const { classes } = this.props;
        console.log(this.state.tempConflict);
  return (
    <Grid fluid className={classes.root}>
    {this.deadlineDialougeOpen()}
    {this.conflictDialougeOpen()}
    <Paper className={classes.paper} elevation={4}>
    <form>
    <Row around="xs">
    <Col xs={4} xsOffset={2}>
       
        {this.state.error && <Typography component="p">
        {this.state.error}
      </Typography>}

      <FormControl className={classes.formControl}>
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
      
      { this.selectableCourse(this.props.course).map(this.courseOption)}
     
      </Select>
      <FormHelperText>Select Course</FormHelperText>
      </FormControl>
        </Col>
    
        <Col xs={4} xsOffset={2}>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="room">Room</InputLabel>
        <Select
        value={this.state.roomNumber}
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
      <FormHelperText>Start Date</FormHelperText>  

          <DatePicker
            value={this.state.date}
            onChange={this.onDateChange}
          />

        </Col>
        <Col xs={4} xsOffset={2}>
        <FormHelperText>Choose a start time</FormHelperText>
        <TimePicker
          value={this.state.startTime}
          onChange={this.onStartTimeChange} 
        />
          </Col>
          </Row>
          <Row around='xs'>
          <Col xs={4} xsOffset={2}>
          <FormHelperText>Choose a end time</FormHelperText>
          <TimePicker
            value={this.state.endTime}
            onChange={this.onEndTimeChange}
           // label="Choose a end time"  
          />
      </Col>

      <Col xs={4} xsOffset={2}>
        
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

AddConlfictForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state)=>{
    return {
              course:state.courses,
              room:state.room,
              deadline:state.deadline,
              auth:state.auth,
              conflict:state.conflict
    };
  };
  
  export default compose(
    withStyles(styles, {
      name: 'AddConlfictForm',
    }),
    connect(mapStateToProps),
  )(AddConlfictForm);

