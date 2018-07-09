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

import { startSetConflict } from '../../actions/conflict';
import ConflictTable from './ConflictTable';
import ConflictDialouge from './ConflictDialouge';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class ConflictView extends React.Component {
    constructor(props){
        super(props)
        this.state= {
     
    }
} 

componentDidMount(){
   this.props.dispatch(startSetConflict());
}

displayConflict=(conflict)=>{
    const date = conflict.date;
    return(
        <div>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={this.props.classes.heading}> Connflict on {date} for room {conflict.roomNum}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ConflictTable  conflict = {conflict}/>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    );
};

    render(){
        const { classes } = this.props;
        return (
        <div className={classes.root}>
        {this.props.conflict.map(this.displayConflict)}
        </div>
        );

    }
}

ConflictView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return {
              conflict:state.conflict
    };
  };
  
  export default compose(
    withStyles(styles, {
      name: 'ConflictView',
    }),
    connect(mapStateToProps),
  )(ConflictView);
