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
import Input from 'material-ui';

const styles = theme => ({
    root: theme.mixins.gutters({}),
    formControl:{
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 2,
    },
    button:{
        margin: theme.spacing.unit * 2,
    },
})

class AddRoomForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            roomNum:'',
            roomType:'',
            capacity:'',
            equipment:'',
            offsite:'',
            building:'',
            disabled: false,
        }
    }

    onRoomNumChange=(e)=>{
        const roomNum = e.target.value;
        this.setState(()=>({roomNum}));
    };

    onRoomTypeChange=(e)=>{
        const roomType = e.target.value;
        this.setState(()=>({roomType}));
    };

    onCapacityChange=(e)=>{
        const capacity = e.target.value;
        this.setState(()=>({capacity}));
    };

    onEquipmentChange=(e)=>{
        const equipment = e.target.value;
        this.setState(()=>({equipment}));
    };

    onOffsiteChange=(e)=>{
        const offsite = e.target.value;
        this.setState(()=>({offsite}));
        if(offsite==="Yes"){
            this.setState({disabled: true});
        } else if(offsite==="No"){
            this.setState({disabled: false});
        }
    };

    onBuildingChange=(e)=>{
        const building = e.target.value;
        this.setState(()=>({building}));
    };

    onSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.roomNum && !this.state.roomType &&
           !this.state.capacity && !this.state.equipment &&
           !this.state.offsite && !this.state.building){
               this.setState(()=>({error:'Please provide all the necessary details'}));
        } else {
            this.setState(()=>({error:''}));
            this.setState({
                roomNum:'',
                roomType:'',
                capacity:'',
                equipment:'',
                offsite:'',
                building:'',
                error:''
            });
            this.props.onSubmit({
                roomNum: this.state.roomNum,
                roomType: this.state.roomType,
                capacity: this.state.capacity,
                equipment: this.state.equipment,
                offsite: this.state.offsite,
            });
        }
    }

    render(){
        const {classes} = this.props;
        return(
            <Grid className={classes.root} fluid>
                <Row>
                <FormControl className={classes.formControl}>
                    <FormHelperText>Building name</FormHelperText>
                    <TextField
                     id="building"
                     value={this.state.building}
                     onChange={this.onBuildingChange}
                     margin="normal"
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    {this.state.error && <Typography color='secondary' component='p'> {this.state.error} </Typography>}
                    <FormHelperText>Room Number</FormHelperText>
                    <TextField
                     id="roomNum"
                     value={this.state.roomNum}
                     onChange={this.onRoomNumChange}
                     disabled={this.state.disabled}
                     type="number"
                     margin="normal"
                    />
                </FormControl>
                </Row>

                <Row>
                <FormControl className={classes.formControl}>
                    {this.state.error && <Typography color='secondary' component='p'> {this.state.error} </Typography>}
                    <FormHelperText>Room Type</FormHelperText>
                    <TextField
                     id="roomType"
                     value={this.state.roomType}
                     onChange={this.onRoomTypeChange}
                     disabled={this.state.disabled}
                     margin="normal"
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    {this.state.error && <Typography color='secondary' component='p'> {this.state.error} </Typography>}
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
                    {this.state.error && <Typography color='secondary' component='p'> {this.state.error} </Typography>}
                    <FormHelperText>Offsite</FormHelperText>
                    <Select
                    value={this.state.offsite}
                    onChange={this.onOffsiteChange}
                    inputProps={{
                        name:'Offsite',
                        id: 'offsite'}}
                    >
                        <MenuItem value='Yes'>Yes</MenuItem>
                        <MenuItem value='No'>No</MenuItem>
                    </Select>
                </FormControl>
                </Row>

                <Row>
                <FormControl className={classes.formControl}>
                    {this.state.error && <Typography color='secondary' component='p'> {this.state.error} </Typography>}
                    <FormHelperText>Equipment</FormHelperText>
                    <TextField
                     id="equipment"
                     multiline
                     rows='5'
                     value={this.state.equipment}
                     onChange={this.onEquipmentChange}
                     disabled={this.state.disabled}
                     margin="normal"
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                <Button raised color='primary' className={classes.button} onClick={this.onSubmit}>
                    Add Room
                </Button>
                </FormControl>
                </Row>
            </Grid>
        );
    }

}

AddRoomForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRoomForm);


