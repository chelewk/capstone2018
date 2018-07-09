import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import {Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem, Menu } from 'material-ui/Menu';
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
import RepeatEvent from './RepeatEvent';
import Divider from 'material-ui/Divider';
import RoomIcon from 'material-ui-icons/Place';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import NoteIcon from 'material-ui-icons/Reorder';
import { FormGroup, FormControlLabel } from "material-ui/Form";
import ConflictDialogue from '../conflict/ConflictWarning';
import{ addEvent } from '../../actions/event';
import Deadline from './DeadlineDialouge';
import Conflict from './ConflictDialouge';
//<<<<<<< HEAD
import { startAddConflict } from '../../actions/conflict';
//=======
import Tabs, { Tab } from 'material-ui/Tabs';
import {Link} from 'react-router-dom';
import RoomSearch from '../RoomSearch';
import { startAddRoom } from '../../actions/room';
//>>>>>>> dd56ab4a8c6e93cf59311dd9aaad65db77964cdc

const styles = theme => ({
  root: theme.mixins.gutters({
    margin: theme.spacing.unit,
  }),
  button:{
    margin: theme.spacing.unit,
  },
  formControl:{
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  courseName:{
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    width: "40%",
  },
  text:{
    width: 500,
  },
});

class AddEventForm extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            course:0,
            room:0,
            notes:'',
            startTime: moment(),
            endTime: moment(),
            date: moment(),
            deadlineOpen:false,
            conflictOpen:false,
//<<<<<<< HEAD
            tempConflict:[],
            cuid:this.props.auth[0].cwid,
            courseName:"",
            roomNumber:0,
//=======
            searchOpen: false,
            tempConflict:[]
//>>>>>>> dd56ab4a8c6e93cf59311dd9aaad65db77964cdc
        };
    } 

    getEvent=()=>{
      const event = {
        cuid:this.state.cuid,
        crn:this.state.course,
        location:this.state.room,
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
            console.log(`http://104.196.55.103:443/product/event/createEvent.php?crn=${crn}&cuid=${cuid}&location=${location}&startTime=${startTime}&endTime=${endTime}&date=${date}&notes=${notes}`);
            const event= {crn,location,startTime,endTime,date,notes,roomNumber,courseName};
            const test =  axios({
               url: `http://104.196.55.103:443/product/event/createEvent.php?crn=${crn}&cuid=${cuid}&location=${location}&startTime=${startTime}&endTime=${endTime}&date=${date}&notes=${notes}`,
               method:'POST',
               headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'}
            })
            .then((response)=>{
              console.log(response);  
              if(response.data.status === 200){
                    // dispatch(addEvent({
                    //     id:response.data.id,
                    //     ...event
                    // }));
                    console.log(response);
                }
              
                else if(response.data.status === 409){
                  console.log(response);
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
                    console.log(tempConflict);
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
        const room = e.target.value;
        this.setState(()=>({room}));
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
    const origin = this.state.tempConflict[0];
    const con = this.getEvent();
    const conflict={
      date:con.date,
      roomNum:con.roomNumber,
      conInstructor:this.props.auth[0].firstName+" "+this.props.auth[0].lastName,
      conStartTime:con.startTime,
      conEndTime:con.endTime,
      conCourseName:con.courseName,
      conCrn:con.crn,
      cuid:con.cuid,
      roomId:con.location,
      originEventID:origin.originEventID,
      originInstructor:origin.originInstructor,
      originStartTime:origin.originStartTime,
      originEndTime:origin.originEndTime,
      originCourseName:origin.originCourseName,
      originCrn:origin.originCrn,
      
      //eventId: .originEventID,
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
    );
  };

  roomOption=(room)=>{
    const roomNumber = room.number;
    return(
      <MenuItem value={room.id}>{roomNumber}</MenuItem>
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

  getRoomNumber=()=>{
    const roomNumber= this.props.room.find((room)=>{
      return (room.id===this.state.room);
    });
    this.setState(()=>({roomNumber:roomNumber.number}));
    //return roomNumber;
  };

  getCourseName=()=>{
    const courseName = this.props.course.find((course)=>{
      return (course.crn===this.state.course);
    });
    this.setState(()=>({courseName:courseName.courseName}));
    //return courseName;
  };

  // getCuid=()=>{
  //   const cuid = this.props.auth[0].cwid;
  //   this.setState(()=>({cuid: cuid}));
  //   //return cuid;
  // };

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
            //this.getCuid();
          this.getRoomNumber();
          this.getCourseName();
          const event = this.getEvent();
          console.log(event);
          if(this.checkDeadline(event.date)){
           this.props.dispatch(this.startAddEvent(event));
          }
          else{
            this.handleDeadlineClickOpen();
          }
        }
    }

    render(){
        const { classes } = this.props;
        console.log(this.state);
  return (
    <Grid fluid className={classes.root}>
    {this.deadlineDialougeOpen()}
    {this.conflictDialougeOpen()}
    <Row>
      {this.state.error && <Typography component="p"> {this.state.error} </Typography>}
      <FormControl className={classes.courseName}>
        <FormHelperText>Course Name</FormHelperText>
        <Select
         value={this.state.course}
         autoWidth
         onChange={this.onCourseChange}
         inputProps={{
           name:'Course',
           id: 'course',
         }}>
          {this.selectableCourse(this.props.course).map(this.courseOption)}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button raised color="primary" className={classes.button} onClick={this.onSubmit}>
         Save
        </Button>
      </FormControl>
    </Row>
    
    <Row>
      <FormControl className={classes.formControl}>
        {this.state.error && <Typography component="p"> {this.state.error} </Typography>}
        <FormHelperText>Select Date</FormHelperText>
        <DatePicker value={this.state.date} onChange={this.onDateChange}/>
      </FormControl>
      <FormControl className={classes.formControl}>
        {this.state.error && <Typography component="p"> {this.state.error} </Typography>}
        <FormHelperText>Start Time</FormHelperText>
        <TimePicker
         value={this.state.startTime}
         onChange={this.onStartTimeChange}/>
      </FormControl>
      <FormControl className={classes.formControl}>
        {this.state.error && <Typography component="p"> {this.state.error} </Typography>}
        <FormHelperText>End Time</FormHelperText>
        <TimePicker
         value={this.state.endTime}
         onChange={this.onEndTimeChange}/>
      </FormControl>
    </Row>

    <Tabs rasised color="primary">
      <Tab label="Event Details"/>
    </Tabs>
    <Divider />

    <Row>
      <ListItem>
        <RoomIcon />
      </ListItem>
      <FormControl className={classes.formControl}>
        <FormHelperText>Location</FormHelperText>
          <TextField
           select
           className={classes.text}
           value={this.state.room}
           autoWidth
           onChange={this.onRoomChange}>
            {this.props.room.map(this.roomOption)}
          </TextField>
      </FormControl>
      <FormControl className={classes.formControl}>
         <RoomSearch/>
      </FormControl>
    </Row>

    <Row>
      <FormControl className={classes.formControl}>
        <NoteIcon />
      </FormControl>
      <FormControl className={classes.formControl}>
      <FormHelperText>Note</FormHelperText>
      <TextField
          multiline
          className={classes.text}
          rows="5"
          id="note"
          value={this.state.notes}
          onChange={this.onNotesChange} />
      </FormControl>
    </Row>
    </Grid>
  );
}
}

AddEventForm.propTypes = {
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
      name: 'AddEventForm',
    }),
    connect(mapStateToProps),
  )(AddEventForm);

