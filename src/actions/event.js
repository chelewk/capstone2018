import axios from 'axios';
import moment from 'moment';
import { startSetTempConflict,tempConflict } from './conflict';

//Add Event
export const addEvent=(event)=>({
        type:'ADD_EVENT',
            event
    });

// export const startAddEvent = (eventData={})=>{
//         return (dispatch)=>{
//             const{
//                 crn=0,
//                 location=0,
//                 startTime='',
//                 endTime='',
//                 date='',
//                 notes="",
//                 courseName="",
//                 roomNumber=0,  
//                 cuid=0  
//             } = eventData;
            
//             const event= {crn,location,startTime,endTime,date,notes,roomNumber,courseName};
//             const test =  axios({
//                url: `http://104.196.55.103:443/product/event/createEvent.php?crn=${crn}&cuid=${cuid}&location=${location}&startTime=${startTime}&endTime=${endTime}&date=${date}&notes=${notes}`,
//                method:'POST',
//                headers:{
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'}
//             })
//             .then((response)=>{
//                 if(response.data.status === 200){
//                     dispatch(addEvent({
//                         id:response.data.id,
//                         ...event
//                     }));
//                 }
                
//                 else if(response.data.status === 409){
//                     console.log("Conflict created");
//                     const{
//                         originEventID=0,
//                         originInstructor='',
//                         originStartTime='',
//                         originEndTime='',
//                         originCourseName='',
//                         originCrn=''
//                     }= response.data.data;
//                     const tempConflictStore = {originEventID,originInstructor,originStartTime,originEndTime,originCourseName,originCrn};
//                     //return tempConflictStore;
//                    // dispatch(tempConflict(tempConflictStore));
//                 }
//             })
//             .catch((response)=>{
//                 console.log(response);
//             });
//         }
//     };


//Remove Event
    export const removeEvent = ({id}={})=>({
        type:'REMOVE_EVENT',
        id
    });

    export const startRemoveEvent =({id}={})=>{
        return(dispatch)=>{
           // console.log(`http://104.196.55.103:443/product/event/deleteEvent.php?id=${id}`);
            return axios({
                url: `http://104.196.55.103:443/product/event/deleteEvent.php?id=${id}`,
                method:'POST',
                headers:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'}
             })
             .then((response)=>{
                 dispatch(removeEvent({id}));
                 console.log(response);
                 console.log("Event Deleted");
             })
             .catch((response)=>{
                 console.log("Failed to remove course");
             });
        };
    };

    export const editEvent=({id,updates}={})=>({
        type:'EDIT_EVENT',
        id,
        updates
    });

    export const startEditEvent = (id,cuid,updates)=>{
        return(dispatch)=>{
            const{
                crn=0,
                location=0,
                startTime='',
                endTime='',
                date='',
                notes="",
            }= updates;
            
            let api=`?id=${id}&cuid=${cuid}&`;
                    for(let x in updates){
                        var key = updates[x];
                         api = api + `${x}=${key}&`;
                    }
            api = api.slice(0,-1);
            const update = {id,crn,location,startTime,endTime,date,notes};
            console.log(`http://104.196.55.103:443/product/event/updateEvent.php${api}`);
            return axios({
                url: `http://104.196.55.103:443/product/event/updateEvent.php${api}`,
                method:'POST',
                headers:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'}
             })
             .then((response)=>{
                 //dispatch(editEvent({id,updates}));
                 console.log(response);
             })
             .catch((response)=>{
                 console.log("Failed to update course");
             });
        };
    };

    export const setEvent = (event)=>({
        type:'SET_EVENT',
        event
    });
    
    export const startSetEvent = (userID,role)=>{
        return(dispatch,getState)=>{
            console.log(userID);
            console.log(role);
            return axios.get(`http://104.196.55.103:443/product/event/getEvents.php?userID=${userID}&role=${role}`)
                .then((response)=>{
                    const event = response.data.data;
                   // console.log(event);
                    const eventArray =[];
                    event.forEach((eventData)=>{
                        const dateData = eventData.date;
                        const startTimeData = eventData.startTime;
                        const endTimeData = eventData.endTime;
                        eventArray.push({
                            id:eventData.id,
                            crn:eventData.crn,
                            courseName:eventData.courseName,
                            building:eventData.building,
                            roomNumber:eventData.roomNumber,
                            location:eventData.locationID,
                            date: moment(dateData).format("MM-D-YYYY"),
                            startTime:moment(startTimeData,"HH:mm:ss").format("hh:m A"),
                            endTime: moment(endTimeData,"HH:mm:ss").format("hh:m A"),
                            notes:eventData.notes,
                            createdBy: eventData.insFirstName + " "+ eventData.insLastName
                        });
    
                    });
                    dispatch(setEvent(eventArray));
                });
        };
    };