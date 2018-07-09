import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {connect} from 'react-redux';
import {compose} from 'redux';
import axios from 'axios';

import Newevent from './NewEvent';
import UpdatedEventPanel from './UpdatedEventPanel';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class RequestLog extends React.Component {

    constructor(props){
        super(props);
        this.state={
            create:[],
            update:[]
        };
    };

    startAddRequest = ()=>{
        return (dispatch)=>{
            return axios({
               url: `http://104.196.55.103:443/product/requests/getRequests.php`,
               method:'POST',
               headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'}
            })
            .then((response)=>{
              const tempRequest = response.data.data;
              const update = tempRequest.filter((request)=>{
                return request.reqType==="update";
              });
              const create=tempRequest.filter((request)=>{
                return request.reqType=== 'create';
              });
            
              this.setState({ update });
              this.setState({ create });
            })

            .catch((response)=>{
                console.log(response);
            });
        }
    };

    componentDidMount(){
        this.props.dispatch(this.startAddRequest());
    }

    displayNewEvent = ()=>{
        if(this.state.create.length>0){
            return(
                <Newevent data={this.state.create}/>
            );    
        }
        else{
            return(
                <p>There are no create event request for right now!!</p>
            );
        }
    };

    displayUpdatedEvent = ()=>{
        if(this.state.update.length>0){
            return(
                <UpdatedEventPanel data={this.state.update}/>
            );    
        }
        else{
            return(
                <p>There are no create event request for right now!!</p>
            );
        }
    };

    render(){
        const { classes } = this.props;
        console.log(this.state.update);
        return(
            <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>View added event request</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                    {this.displayNewEvent()}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>View updated events</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {this.displayUpdatedEvent()}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>

        );
    }
}

RequestLog.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
    withStyles(styles, {
      name: 'RequestLog',
    }),
    connect(),
  )(RequestLog);