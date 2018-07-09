import React from 'react';
import {connect} from 'react-redux';
import ListHTML from '../ListHTML';
import { startRemoveDeadline, startEditDeadline } from '../../actions/deadline';

class DeadlineView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'year', title: 'Year' },
        { name: 'fallStart', title: 'Fall Start' },
        { name: 'fallEnd', title: 'Fall End' },
        { name: 'springStart', title: 'Spring Start' },
        { name: 'springEnd', title: 'Spring End' }
      ],
      columnWidths: [
        { columnName: 'year', width: 240 },
        { columnName: 'fallStart', width: 240 },
        { columnName: 'fallEnd', width: 240 },
        { columnName: 'springStart', width: 180 },
        { columnName: 'springEnd', width: 180 },
      ],
      columnOrder: ['year', 'fallStart', 'fallEnd', 'springStart','springEnd'],
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
   const  rows  = this.props.deadline;
    if (changed) {
      const index = Object.keys(changed)[0];
      const idStore = rows[index].id;
      const updates = changed[index];
      const deadline = {
        ...rows[index],
        ...updates
      };

      this.props.editDeadline(idStore,deadline);
    }

    if (deleted) {
        const id = rows[deleted].id;
        this.props.removeDeadline({id});
    }
  }

  render() {
    const rowsItem =  this.props.deadline;
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
      removeDeadline:(id)=>dispatch(startRemoveDeadline(id)),
      editDeadline:(id,updates)=>dispatch(startEditDeadline(id,updates))
  };
};

const mapStateToProps = (state)=>{
  return {
      deadline:state.deadline
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(DeadlineView);
