import React, { Fragment, Component } from 'react';
import { DatePicker } from 'material-ui-pickers';
import { IconButton, Typography, Icon, InputAdornment } from 'material-ui';
import LeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import RightIcon from 'material-ui-icons/KeyboardArrowRight';
import DateIcon from 'material-ui-icons/DateRange';
import moment from 'moment';

const Date = (props)=>(
  <Fragment>
  <div className="picker">
    <DatePicker
      keyboard
      clearable
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      leftArrowIcon={<LeftIcon/>}
      rightArrowIcon={<RightIcon/>}
      disabled={props.disabled}
      keyboardIcon={<DateIcon/>}
      animateYearScrolling={false}
    />
  </div>
</Fragment>
);


export default Date;