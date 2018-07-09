import React, { Fragment, Component } from 'react';
import { TimePicker} from 'material-ui-pickers';
import { IconButton, Typography, Icon, InputAdornment } from 'material-ui';
import LeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import RightIcon from 'material-ui-icons/KeyboardArrowRight';
import TimeIcon from 'material-ui-icons/AccessTime';
import moment from 'moment';

const Time = (props)=>(
    <Fragment>
      <div className="picker">
        <TimePicker
          keyboard
          label={props.label}
          leftArrowIcon={<LeftIcon/>}
          rightArrowIcon={<RightIcon/>}
          keyboardIcon={<TimeIcon/>}
          disabled={props.disabled}
          mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
          placeholder="08:00 AM"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </Fragment>
);


export default Time;