import axios from 'axios';

export const login=(user)=>({
    type:"LOGIN",
    user
});

export const updateUser=(cwid,updates)=>({
    type:'UPDATE_USER',
    cwid,
    updates
});

export const logOut =()=>({
        type:'LOGOUT'
    });


