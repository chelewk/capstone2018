import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { startAddDeadline } from '../../actions/deadline';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import DatePicker from '../DatePicker';
import { DatePickerWrapper } from 'material-ui-pickers';
import { Row, Col } from 'react-flexbox-grid';
import { Button, MenuItem, FormHelperText, Select, Paper } from 'material-ui';
import moment from 'moment';
import axios from 'axios';
import {connect} from 'react-redux';
import {compose} from 'redux';

const styles = theme => ({
    button:{
        margin: theme.spacing.unit * 2,
        borderRadius: 25,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
      },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
})

class DeadlinePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            semester: '',
            startDate: moment(),
            endDate: moment(),
        }; 
    }

    onSemesterChange=(e)=>{
        const semester = e.target.value;
        this.setState(()=>({semester}));
    }

    onStartDateChange=(e)=>{
        const startDate = e;
        this.setState(()=>({startDate}));
    }

    onEndDateChange=(e)=>{
        const endDate = e;
        this.setState(()=>({endDate}));
    }

    setDeadline=(date,start,end)=>{
        return axios({
            url: `http://104.196.55.103:443/product/deadlines/setDeadlines.php?year=${date}&springStart=${start}&springEnd=${end}`,
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
             }
         })
         .catch((response)=>{
             console.log("Failed to create event");
         });
         
    }

    onSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.semester
            && !this.state.startDate
            && !this.state.endDate) {
                this.setState(()=>({error:'Please provide all the information'}));
            }
        else {
            this.setState(()=>({error:''}));
            this.setState({
                semester: '',
                startDate: moment(),
                endDate: moment(),
            });
            const deadlineDate = {
                semester: this.state.semester,
                year:this.state.startDate.format('YYYY'),
                springStart: this.state.startDate.format('MM-D-YYYY'),
                springEnd: this.state.endDate.format('MM-D-YYYY')
            };

            console.log(deadlineDate);
            this.props.dispatch(startAddDeadline(deadlineDate));
        }
    }

    render(){
        const {classes} = this.props;
    return(
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography component="p" className={classes.heading}>Create a deadline</Typography>
                <Typography className={classes.secondaryHeading}>
              Create deadline for each semester.
            </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Col>
                <FormHelperText>Select Semester</FormHelperText>
                <Select
                 inputProps={{name:'Select Semester', id:'semester'}}
                 value={this.state.semester}
                 onChange={this.onSemesterChange}
                >
                    <MenuItem value='Fall'>Fall</MenuItem>
                    <MenuItem value='Spring'>Spring</MenuItem>
                </Select>
                <FormHelperText>Start Date</FormHelperText>
                <DatePicker value={this.state.startDate} onChange={this.onStartDateChange}/>
                <FormHelperText>End Date</FormHelperText>
                <DatePicker value={this.state.endDate} onChange={this.onEndDateChange}/>
                <Button
                 raised color='primary'
                 className={classes.button}
                 onClick={this.onSubmit}
                >Create</Button>
                </Col>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );

    }
}

export default compose(
    withStyles(styles, {
      name: 'DeadlinePage',
    }),
    connect(),
  )(DeadlinePage);