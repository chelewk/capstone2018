import React from 'react';
import {connect} from 'react-redux';
import { startRemoveCourse, startEditCourse } from '../../actions/courses';
import ListHTML from '../ListHTML';

class CourseView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'courseName', title: 'Name' },
        { name: 'crn', title: 'CRN' },
        { name: 'instructor', title: 'Instructor' },
        { name: 'year', title: 'Year' },
        { name: 'semester', title: 'Semester' }
      ],
      columnWidths: [
        { columnName: 'courseName', width: 240 },
        { columnName: 'crn', width: 240 },
        { columnName: 'instructor', width: 240 },
        { columnName: 'year', width: 180 },
        { columnName: 'semester', width: 180 },
      ],
      columnOrder: ['courseName', 'crn', 'instructor', 'year','semester'],
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
   const  rows  = this.props.courses;
    if (changed) {
      const index = Object.keys(changed)[0];
      const idStore = rows[index].id;
      const updates = changed[index];
      const course = {
        ...rows[index],
        ...updates
      };

      this.props.editCourse(idStore,course);
    }

    if (deleted) {
        const id = rows[deleted].id;
        this.props.removeCourse({id});
    }
  }

  render() {
    const rowsItem =  this.props.courses;
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
      removeCourse:(id)=>dispatch(startRemoveCourse(id)),
      editCourse:(id,updates)=>dispatch(startEditCourse(id,updates))
  };
};

const mapStateToProps = (state)=>{
  return {
      courses:state.courses
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CourseView);
