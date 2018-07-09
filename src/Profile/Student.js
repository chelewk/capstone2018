import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '../components/AppBar';
import Paper from 'material-ui/Paper/Paper';
import Divider from 'material-ui/Divider/Divider';
import Typography from 'material-ui/Typography/Typography';
import { Grid } from 'react-flexbox-grid';
import Classes from './Classes';

class StudentProfile extends React.Component {
    render() {
        return (
            <div>
                <AppBar/>
                <Grid item xs={6}>
                    <Paper>Profile Pic</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Typography>
                            Name: Group Epsilon <br/>
                            Email: capstone@warhawks.ulm.edu <br />
                            Semester: 8
                        </Typography>
                    </Paper>
                </Grid>
                <Divider/>
                <Classes/>
            </div>
        )
    }
}

export default StudentProfile;