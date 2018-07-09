import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import {compose} from 'redux';
import axios from 'axios';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


const approve =(data)=>{
    console.log(data);
    console.log("clicked");
};

const reject =(data)=>{
    //console.log(data);
};

class HandleRequest extends React.Component {
    constructor(props){
        super(props);
    }

    handleRequest=(status)=>{
        let url = `http://104.196.55.103:443/product/requests/handleRequest.php?command=${status}`
        if(status==='accept'){
            url += `&crn=${this.props.data.crn}&location=${this.props.data.locationID}&startTime=${this.props.data.startTime}&endTime=${this.props.data.endTime}&reqID=${this.props.data.reqID}&date=${this.props.data.date}&notes=${this.props.data.notes}`;
            if(this.props.data.status==='update'){
                url += `&eventID=${this.props.data.eventID}`
            }
        }
        else if(status ==='deny'){
            url += `&reqID=${this.props.data.reqID}`;
        }
        console.log(url);
        return (dispatch)=>{
            return axios({
               url: url,
               method:'POST',
               headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'}
            })
            .then((response)=>{
                console.log(response);
            })

            .catch((response)=>{
                console.log(response);
            });
        }
    };

        render(){
            const { classes,data } = this.props;
            console.log(data);
            return(
                <div>
                    <Button raised color="primary" className={classes.button} onClick={()=>{this.props.dispatch(this.handleRequest("accept"))}}>
                        Approve
                    </Button>
                    <Button raised color="primary" className={classes.button} onClick={()=>{this.props.dispatch(this.handleRequest("deny"))}} >
                        Reject
                    </Button>
            </div>
            );
        }
}

HandleRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
    withStyles(styles, {
      name: 'HandleRequest',
    }),
    connect(),
  )(HandleRequest);
