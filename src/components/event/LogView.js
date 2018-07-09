import React from 'react';
import {connect} from 'react-redux';
import {  startRemoveEvent, startEditEvent } from '../../actions/event';
import ListHTML from '../ListHTML';
import axios from 'axios';

class LogView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'changeInfo', title: 'Changed Information' },
        { name: 'name', title: 'Instructor' },
        { name: 'date', title: 'Date' },
      ],
      columnWidths: [
        { columnName: 'changeInfo', width: 350 },
        { columnName: 'name', width: 240 },
        { columnName: 'date', width: 240 },
      ],
      columnOrder: ['changeInfo','name', 'date'],
      logData:[]
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.changeColumnOrder = this.changeColumnOrder.bind(this);
    this.changeColumnWidths = this.changeColumnWidths.bind(this);
  }
  
  componentDidMount(){
    const id = this.props.row.id;

      return axios({
          url: `http://104.196.55.103:443/product/event/getChangeLog.php?eventID=${id}`,
          method:'POST',
             headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'}
      })
      .then((response)=>{
       if(response.status===200){
         const logData = response.data.data;
         const logArray=[];
         logData.forEach((log) => {
           const tempLog={
            id:log.logID,
            ...log
           };
          logArray.push(tempLog)
         });
        this.setState({logData: logArray});
        //console.log("Sucessful to get the log data");
       }
      else{
        //console.log("Failed to get log data");
      }
      })
      .catch(()=>{
          console.log("Log failed");
      });
  };

  changeColumnWidths = (columnWidths) => {
    this.setState({ columnWidths });
  }

  changeColumnOrder(newOrder) {
    this.setState({ columnOrder: newOrder });
  }

  deleteApiCall=(id)=>{
    return axios({
      url: `http://104.196.55.103:443/product/event/deleteLog.php?logID=${id}`,
      method:'POST',
         headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'}
  })
  .then((response)=>{
    console.log(response);
  })
  .catch(()=>{
      console.log("Log delete failed");
  });
  };

 deleteLog=(idDelete)=>{
    const updatedArray =  this.state.logData.filter(({id=''})=>id !== idDelete );
    this.setState({logData: updatedArray});

 };


  commitChanges({ changed, deleted }) {    
    if (deleted) {
      const id = deleted[0];
      this.deleteLog(id);
      this.deleteApiCall(id);
    }
  }

  render() {
    const rowsItem =  this.props.event;
    const { columns,columnWidths,columnOrder,logData } = this.state;
    const status = logData.length>0;
    return (
        <ListHTML 
        rowsItem={logData}
        commitChanges={this.commitChanges}
        columns={columns}
        columnWidths={columnWidths}
        columnOrder={columnOrder}
        pathname={"log"}
       />
    );
  }
}

export default LogView;
