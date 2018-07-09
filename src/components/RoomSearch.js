import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import moment from 'moment';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Input from 'material-ui/Input';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';

const styles = theme => ({
    root: theme.mixins.gutters({}),
    button:{
        margin: theme.spacing.unit * 2,
    },
    formControl:{
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
        display: 'flex',
        flexWrap: 'wrap',
    },    
});

const equipments = [
    "Computers",
    "Beds",
    "Tables",
    "Chairs",
    "Smartboard",
    "Mannequins",

];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class RoomSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            date: moment(),
            startTime: moment(),
            endTime: moment(),
            equipment: [],
            capacity: 0,
            offsite: '',
            disabled: false,
            open: false,
        };
    };

    onDateChange=(date)=>{
        this.setState(()=>({date}));
    };

    onStartTimeChange=(time)=>{
        const startTime = time;
        this.setState(()=>({startTime}));
    };

    onEndTimeChange=(time)=>{
        const endTime = time;
        this.setState(()=>({endTime}));
    };

    onEquipmentChange=event=>{
        this.setState({ equipment: event.target.value});
    };

    onCapacityChange=(e)=>{
        const capacity = e.target.value;
        this.setState(()=>({capacity}));
    };

    handleClickOpen = () => {
        this.setState({ open: true });
      };

    handleClose = () => {
        this.setState({ open: false });
      };

    onOffsiteChange=(e)=>{
        const offsite = e.target.value;
        this.setState(()=>({offsite}));
        if(offsite==="Yes"){
            this.setState({disabled: true});
        } else if (offsite==="No"){
            this.setState({disabled: false});
        }
    };

    onSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.date && !this.state.startTime && !this.state.endTime){
            this.setState(()=>({error: "Please provide the date and time"}));
        } else {
            this.setState(()=>({error:''}));
            this.setState({
                equipment: '',
                capacity: '',
                offsite: '',
                error:'',
            });
            console.log({
                date: this.state.date.format("MM-D-YYYY"),
                startTime: this.state.startTime.format("hh:m A"),
                endTime: this.state.endTime.format("hh:m A"),
                equipment: this.state.equipment.join(", "),
                capacity: this.state.capacity,
                offsite: this.state.offsite,
            });
        };
    };

    render(){
        const {classes, theme} = this.props;
        return(
            <div>
            <Button raised color="primary" onClick={this.handleClickOpen}>Search Room</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="search-dialog-title">
            <DialogTitle id="search-dialog-title">Room Search</DialogTitle>
            <DialogContent>
                <Row>
                <FormControl className={classes.formControl}>
                    {this.state.error && <Typography component="p">{this.state.error}</Typography>}
                    <FormHelperText>Select Date</FormHelperText>
                    <DatePicker
                     value={this.state.date}
                     onChange={this.onDateChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Button
                     className={classes.button}
                     raised color="primary"
                     onClick={this.onSubmit}>
                        Search
                    </Button>
                </FormControl>
                </Row>
                
                <Row>
                <FormControl className={classes.formControl}>
                    <FormHelperText>Select Start Time</FormHelperText>
                    <TimePicker
                     value={this.state.startTime}
                     onChange={this.onStartTimeChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormHelperText>Select End Time</FormHelperText>
                    <TimePicker
                     value={this.state.endTime}
                     onChange={this.onEndTimeChange}
                    />
                </FormControl>
                </Row>

                <Row>
                <FormControl className={classes.formControl}>
                    {this.state.error && <Typography component="p">{this.state.error}</Typography>}
                    <FormHelperText>Capacity</FormHelperText>
                    <TextField
                     id="capacity"
                     value={this.state.capacity}
                     onChange={this.onCapacityChange}
                     disabled={this.state.disabled}
                     type="number"
                     margin="normal"
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    {this.state.error && <Typography component="p">{this.state.error}</Typography>}
                    <FormHelperText>Equipment</FormHelperText>
                    <Select
                     multiple
                     value={this.state.equipment}
                     onChange={this.onEquipmentChange}
                     disabled={this.state.disabled}
                     input={<Input id="equipment"/>}
                     renderValue={selected => selected.join(", ")}
                     MenuProps={MenuProps}>
                        {equipments.map(equipment=>(
                            <MenuItem key={equipment} value={equipment}>
                                <Checkbox checked={this.state.equipment.indexOf(equipment) > -1} />
                                <ListItemText primary={equipment} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    {this.state.error && <Typography component="p">{this.state.error}</Typography>}
                    <FormHelperText>Offsite</FormHelperText>
                    <Select
                     value={this.state.offsite}
                     onChange={this.onOffsiteChange}
                     inputProps={{
                         name:"Offsite",
                         id:"offsite"}}>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                </FormControl>
                </Row>
            </DialogContent>
            </Dialog>
            </div>
        );
    };
}

RoomSearch.PropTypes={
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RoomSearch);