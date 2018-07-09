import axios from 'axios';
import moment from 'moment';

export const addConflict=(conflict)=>({
        type:'ADD_CONFLICT',
        conflict
    });

export const startAddConflict = (conflict={})=>{
    return(dispatch)=>{
        console.log(conflict);
        return axios({
            url: `http://104.196.55.103:443/product/conflicts/createConflict.php?crn=${conflict.conCrn}&instructor=${conflict.cuid}&location=${conflict.roomId}&startTime=${conflict.conStartTime}&endTime=${conflict.conEndTime}&date=${conflict.date}&eventID=${conflict.originEventID}`,
            method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'}
         })
         .then((response)=>{
             dispatch(addConflict({
                 conID:response.data.id,
                 ...conflict
             }));
         })
         .catch((response)=>{
             console.log(response);
         });
            
    };
};

export const removeConflit=({id}={})=>({
    type:'REMOVE_CONFLICT',
    id
});

export const startRemoveConflict = (id)=>{
    return(dispatch)=>{
        return axios({
            url: `http://104.196.55.103:443/product/conflicts/deleteConflict.php?id=${id}`,
            method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'}
         })
         .then((response)=>{
             dispatch(removeConflit({id}));
         })
         .catch((response)=>{
             console.log(response);
         });
    };
};

export const setConflict = (conflict)=>({
    type:'SET_CONFLICT',
    conflict
});

export const startSetConflict = ()=>{
    return(dispatch)=>{
        return axios.get(`http://104.196.55.103:443/product/conflicts/getConflicts.php`)
            .then((response)=>{
                const conflict = response.data.data;
                conflict.forEach((conflictData)=>{
                    dispatch(setConflict({
                        conID:conflictData.conID,
                        date:conflictData.date,
                        building:conflictData.building,
                        location:conflictData.locationID,
                        roomNum:conflictData.roomNum,
                        conInstructor:conflictData.conInstructor,
                        conStartTime: conflictData.conStartTime,
                        conEndTime: conflictData.conEndTime,
                        conCourseName : conflictData.conCourseName,
                        conCrn: conflictData.conCrn,
                        conNotes:conflictData.conNotes,
                        originEventID:conflictData.originEventID,
                        originInstructor:conflictData.originInstructor,
                        originStartTime:conflictData.originStartTime,
                        originNotes:conflictData.originNotes,
                        originEndTime:conflictData.originEndTime,
                        originCourseName:conflictData.originCourseName,
                        originCrn:conflictData.originCrn
                    }));

                });
               // dispatch(setConflict(conflictArray));
            });
    };
};



