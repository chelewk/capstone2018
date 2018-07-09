import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {connect} from 'react-redux';
import events from '../event/Events';
import PopOverCard from './Card';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const allViews = Object
  .keys(BigCalendar.Views)
  .map(k => BigCalendar.Views[k])

const colors = ["#00796B","#E040FB","#E64A19","#FFEB3B","#303F9F","#FF5252","#512DA8","#4CAF50","#8BC34A","#DCEDC8","#212121","#FF5722","#F57C00","#FFC107","#607D8B","#CDDC39"];
const colorChange=()=>{
  var number = Math.floor(Math.random() * colors.length);
  return colors[number];
}
class CalendarView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      modalOpen:false,
      selectedEvent:null,
    };
  }

   event = this.props.event.map(event=>{
     const date= event.date;
     const startTime = event.startTime;
     const endTime = event.endTime;
    const startDate = date+" "+startTime;
    const endDate = date+" "+endTime;
    const start = moment(startDate).toDate();
    const end = moment(endDate).toDate();
    const time = moment(start).format('h:mm A - ') + moment(end).format('h:mm A');
    return ({
      'title': event.courseName,
      'start':start,
      'end': end,
      "date":date,
      "notes":event.notes,
      "crn":event.crn,
      "room":event.building + "-" + event.roomNumber,
      "color":colorChange(),
      "time":time,
      "createdBy":event.createdBy
    })
  }); 


  onSelectEvent=(event)=>{
    if(!this.state.modalOpen) {
      this.setState({modalOpen: !this.state.modalOpen, selectedEvent: event});
    }
    else {
      this.setState({modalOpen: !this.state.modalOpen});
    }
  };

  eventStyleGetter = (event, start, end, isSelected)=> {
    var backgroundColor = event.color;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '25px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block',
        color:'white'
    };
    return {
        style: style
    };
};
  close = () => {
    this.setState({modalOpen: false});
  };

  render(){
    //console.log(this.props);
    return(
      <div className="calendar">
      <React.Fragment>
    <BigCalendar
    events={this.event}
    popup
    step={60}
    onSelectEvent={(event)=>this.onSelectEvent(event)}
    views={allViews}
    eventPropGetter={(this.eventStyleGetter)}
    //titleAccessor={(event)=>event.title}
  />
  </React.Fragment>
      <PopOverCard 
        open={this.state.modalOpen}
        event={this.state.selectedEvent} 
        close={this.close}
      />
    </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
        event:state.event
  };
};

export default connect(mapStateToProps)(CalendarView);