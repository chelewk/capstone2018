import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import { FormGroup, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import DatePicker from '../DatePicker';

 class RepeatEvent extends React.Component {
  state = {
    open: false,
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleClick() {
    alert("You clicked the Chip."); // eslint-disable-line no-alert
  }

  render() {
    const { classes,startDate } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Repeat Event</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Repeat Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select the end date and days of week to repeat the event
            </DialogContentText>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.sunday}
                    onChange={this.handleChange("sunday")}
                    value="sunday"
                    color="primary"
                  />
                }
                label="Sun"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.monday}
                    onChange={this.handleChange("monday")}
                    value="monday"
                    color="primary"
                  />
                }
                label="Mon"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.tuesday}
                    onChange={this.handleChange("tuesday")}
                    value="tuesday"
                    color="primary"
                  />
                }
                label="Tue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.wednesday}
                    onChange={this.handleChange("wednesday")}
                    value="wednesday"
                    color="primary"
                  />
                }
                label="Wed"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.thursday}
                    onChange={this.handleChange("thursday")}
                    value="thursday"
                    color="primary"
                  />
                }
                label="Thu"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.friday}
                    onChange={this.handleChange("friday")}
                    value="friday"
                    color="primary"
                  />
                }
                label="Fri"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.saturday}
                    onChange={this.handleChange("saturday")}
                    value="saturday"
                    color="primary"
                  />
                }
                label="Sat"
              />

              <DatePicker
              value={startDate}
              onChange={this.onDateChange}
              label='Choose a start date'
            />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RepeatEvent;
