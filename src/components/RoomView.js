import React from 'react';
import {connect} from 'react-redux';
import { startRemoveRoom, startEditRoom } from '../actions/room';
import ListHTML from './ListHTML';
import { startEditCourse } from '../actions/courses';

class RoomView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        columns: [
        { name: 'building', title: 'Building' },
        { name: 'number', title: 'Room Number' },
        { name: 'equipment', title: 'Eqipment'},
        { name: 'capacity', title: 'Capacity' },
        { name: 'offsite', title: 'Offsite' },
        { name: 'type', title: 'Room Type' }
      ],
      columnWidths: [
        { columnName: 'building', width: 240 },
        { columnName: 'number', width: 240 },
        { columnName: 'equipment', width: 240 },
        { columnName: 'capacity', width: 180 },
        { columnName: 'offsite', width: 180 },
        { columnName: 'type', width: 180 },
      ],
      columnOrder: ['type', 'number', 'equipment', 'capacity','offsite','building'],
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
   const  rows  = this.props.room;
    if (changed) {
      const index = Object.keys(changed)[0];
      const idStore = rows[index].id;
      const updates = changed[index];
      const room = {
        ...rows[index],
        ...updates
      };
      console.log(room);
      this.props.editRoom(idStore,room);
    }

    if (deleted) {
      const id = deleted[0];
      //console.log(id);
      this.props.removeRoom({id});
    }
  }

  render() {
    const rowsItem =  this.props.room;
    const { columns,columnWidths,columnOrder, } = this.state;
    return (
     <ListHTML 
      rowsItem={rowsItem}
      commitChanges={this.commitChanges}
      columns={columns}
      columnWidths={columnWidths}
      columnOrder={columnOrder}
      pathname={this.props.pathname}
     />
    );
  }
}

const mapDispatchToProps = (dispatch,props)=>{
  return {
      removeRoom:(id)=>dispatch(startRemoveRoom(id)),
      editRoom:(id,updates)=>dispatch(startEditRoom(id,updates))
  };
};

const mapStateToProps = (state)=>{
  return {
      room:state.room
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(RoomView);

