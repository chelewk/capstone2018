import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
import { startSetRoom,addRoom} from './actions/room';
import {addCourse, startSetCourse} from './actions/courses';
import { addEvent, startSetEvent } from './actions/event';
import { login, updateUser} from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import { startSetDeadline } from './actions/deadline';
import {history} from './routers/AppRouter';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { startSetInstructor } from './actions/instructor';
//import {theme} from './components/Color';

const theme = createMuiTheme({
    palette: {
      primary: { main: '#800029' }, // Purple and green play nicely together.
      secondary: { main: '#bd955a' }, // This is just green.A700 as hex.
    },
  });

const {persistor,store} = configureStore();

const jsx = (
    <Provider store = {store}>
    <PersistGate persistor={persistor}>
        <MuiThemeProvider theme={theme}>
        <AppRouter/>
        </MuiThemeProvider>
    </PersistGate>
    </Provider>
);

let hasRendered = false;
let authStatus = ((store.getState().auth.length) !==0);

export const startLogin = (user={}) =>{
    return (dispatch)=>{
        const{
            userName='',
            password='',
        }=user;

        return axios({
            url: `http://104.196.55.103:443/product/login.php?username=${userName}&password=${password}`,
            method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'}
         })
         .then((response)=>{
             const userData = response.data.data;
             //console.log(userData);
             dispatch(login({
                 cwid:userData.cwid,
                 firstName:userData.firstName,
                 lastName:userData.lastName,
                 role:userData.role,
                 canSchedule:userData.canScheduleCrns
             }));
             const userID= store.getState().auth[0].cwid;
             const role = store.getState().auth[0].role;
             const canSchedule = store.getState().auth[0].canSchedule;
             console.log(userName);
             console.log(role);
             ReactDOM.render(<p>Loading...</p>,document.getElementById('app'));

            const thunkDispatch=()=>{
                return (dispatch)=>{
                    history.push("/calendar");
                       
                     if(role==='instructor'){
                        return dispatch(startSetEvent(userID,role)).then(()=>{
                            return dispatch(startSetRoom()).then(()=>{
                                 return dispatch(startSetDeadline()).then(()=>{
                                    return dispatch(startSetCourse(userID,role));
                             });
                            });
                        });
                       }
                       else if(role==='admin'){
                        return dispatch(startSetEvent(userID,role)).then(()=>{
                            return dispatch(startSetRoom()).then(()=>{
                                 return dispatch(startSetDeadline()).then(()=>{
                                    return dispatch(startSetCourse(userID,role)).then(()=>{
                                        return dispatch(startSetInstructor())
                                    });
                             });
                            });
                        });
                            // return dispatch(startSetRoom()).then(()=>{
                            //      return dispatch(startSetDeadline()).then(()=>{
                            //         return dispatch(startSetCourse(userID,role)).then(()=>{
                            //             return dispatch(startSetInstructor())
                            //         });
                            //  });
                            // });
                       }
                       else if(role==='student'){
                        return dispatch(startSetEvent(userID,role));
                       }
                };
            };
            store.dispatch(thunkDispatch()).then(()=>{
                ReactDOM.render(jsx,document.getElementById('app'));
            });    
         })
         .catch((response)=>{
             console.log("Failed to logged in");
         });
    };
};

ReactDOM.render(jsx,document.getElementById('app'));






