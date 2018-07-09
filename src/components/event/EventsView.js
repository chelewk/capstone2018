import React from 'react';
import {connect} from 'react-redux';
import {  startRemoveEvent, startEditEvent } from '../../actions/event';
import ListHTML from '../ListHTML';

class EventView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'courseName', title: 'Course Name' },
        { name: 'startTime', title: 'Start Time' },
        { name: 'endTime', title: 'End Time' },
        { name: 'date', title: 'Date' },
        { name: 'roomNumber', title: 'Room' },
        { name: 'notes', title: 'Notes' },
        { name: 'crn', title: 'CRN' }
      ],
      columnWidths: [
        { columnName: 'courseName', width: 180 },
        { columnName: 'startTime', width: 100 },
        { columnName: 'endTime', width: 100 },
        { columnName: 'date', width: 100 },
        { columnName: 'roomNumber', width: 100 },
        { columnName: 'notes', width: 240 },
        { columnName: 'crn', width: 100 },
      ],
      columnOrder: ['courseName', 'crn','roomNumber', 'startTime', 'endTime','date','notes'],
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.changeColumnOrder = this.changeColumnOrder.bind(this);
    this.changeColumnWidths = this.changeColumnWidths.bind(this);
  }

  changeColumnWidths = (columnWidths) => {
    this.setState({ columnWidths });
  }

  changeColumnOrder(newOrder) {
    this.setState({ columnOrder: newOrder });
  }

  commitChanges({ changed, deleted }) {
   const  rows  = this.props.event;
    if (changed) {
      const idStore = Object.keys(changed)[0];
      const updates = changed[idStore];
      const cuid = this.props.auth[0].cwid;
     this.props.editEvent(idStore,cuid,updates);
     //console.log(updates);
    }

    if (deleted) {
        const id = deleted[0];
        this.props.removeEvent({id});
        console.log(id);
    }
  }

  render() {
    const rowsItem =  this.props.event;
    const { columns,columnWidths,columnOrder, } = this.state;
    return (
    <div className="eventTable">
     <ListHTML 
      rowsItem={rowsItem}
      commitChanges={this.commitChanges}
      columns={columns}
      columnWidths={columnWidths}
      columnOrder={columnOrder}
      pathname={this.props.pathname}
     />
     </div>
    );
  }
}

const mapDispatchToProps = (dispatch,props)=>{
  return {
      removeEvent:(id)=>dispatch(startRemoveEvent(id)),
      editEvent:(id,cuid,updates)=>dispatch(startEditEvent(id,cuid,updates))
  };
};

const mapStateToProps = (state)=>{
  return {
            event:state.event,
            auth:state.auth
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EventView);
