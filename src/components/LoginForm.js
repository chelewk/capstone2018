import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {startLogin} from '../app';
 
const styles = theme => ({
    root:{
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
 
    loginpic:{
        width: '60%',
        height: '100%',
        position: 'absolute',
        left: 0,
        backgroundImage: 'url(https://bloximages.newyork1.vip.townnews.com/hannapub.com/content/tncms/assets/v3/editorial/c/ea/ceaea450-e677-11e7-8b6d-772fdd5abb0c/5a3bf525aaec3.image.jpg?resize=1200,799)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
 
    loginform:{
        width: '40%',
        height: '100%',
        right: 0,
        position: 'absolute',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
 
    text:{
        width: '40%',
        minWidth: '100px'
    },
    input: {
        width: '100%',
        fontSize: '18px',
        height: '50px'
    }
})


 
class LoginPage extends React.Component{
    state={
        email:'',
        password:'',
        error:'',
    }
 
    onEmailChange=(e)=>{
        const email = e.target.value;
        this.setState(()=>({email}));
    }
 
    onPasswordChange=(e)=>{
        const password = e.target.value;
        this.setState(()=>({password}));
    }
 
    onSubmit=(e)=>{
        e.preventDefault();
            this.props.startLogin({
                userName: this.state.email,
                password: this.state.password
            });
    }
    

    render(){
        const {classes} = this.props;

        var divStyle = {
            color: 'teal',
            fontSize: '25px',
            
        };

        return (
            <form className={classes.root} onSubmit={this.onSubmit}>   
            <div className={classes.loginpic} />
            <Paper className={classes.loginform}>
            <div className={classes.text}>            
               
                <div style={divStyle}>User Log In</div>
                 
                 <br/>
                 <br/>

                <span style={{fontSize:'18px', color: 'gray'}}>Please Login with your CWID</span> 
                
                <br/>
                <br/>
                
                {this.state.error && <Typography component='p'> {this.state.error} </Typography>}
                <TextField required
                 id='email'
                 label='CWID'
                 value={this.state.email}
                 onChange={this.onEmailChange} 
                 className={classes.input}
                /> 
              
                <br/>
                <br/>
               
                <TextField required
                 className={classes.input}
                 id='password'
                 label='Password'
                 value={this.state.password}
                 onChange={this.onPasswordChange} 
                 type='password'
                 autoComplete='current-password'
                /> 

                <br/>
                <br/>
                <br/>

                <Button 
                 type="submit"
                 raised color='primary'
                 style={{'float': 'right'}}>
                 Log In 
                </Button>

            </div>
            </Paper>
            </form>
        );
    }
 
}
 
LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
 
const mapDispatchToProps = (dispatch,props)=>({
    startLogin: (user)=>dispatch(startLogin(user))
});
 
export default compose(
    withStyles(styles),
    connect(undefined,mapDispatchToProps),
)(LoginPage);