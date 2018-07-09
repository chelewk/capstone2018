import uuid from 'uuid';
import axios from 'axios';

//Add Room
export const addRoom=(room)=>({
        type:'ADD_ROOM',
        room
});

export const startAddRoom = (roomData={})=>{
    return (dispatch)=>{
        const{
            building='',
            number=0,
            capacity=0,
            equipment='',
            offsite='',
            type=''
        }= roomData;
        
        const room= {building,number,capacity,equipment,offsite,type};
        return axios({
           url: `http://104.196.55.103:443/product/locations/createLocation.php?roomNum=${number}&equipment=${equipment}&capacity=${capacity}&offsite=${offsite}&roomType=${type}&building=${building}`,
           method:'POST',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then((response)=>{
            dispatch(addRoom({
                id:response.id,
                ...room
            }));
        })
        .catch((response)=>{
            console.log("Failed to add room");
        });
        
    }
};


//Remove Room
export const removeRoom = (
    {id}={})=>({
        type:'REMOVE_ROOM',
        id
    });

export const startRemoveRoom =({id}={})=>{
        return(dispatch)=>{
            return axios({
                url: `http://104.196.55.103:443/product/locations/deleteLocation.php?id=${id}`,
                method:'POST',
                headers:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'}
             })
             .then((response)=>{
                 dispatch(removeRoom({id}));
             })
             .catch((response)=>{
                 console.log("Failed to remove room");
             });
        };
    };


//Edit Room
export const editRoom = (id,updates)=>({
    type:'EDIT_ROOM',
    id,
    updates
});

export const startEditRoom = (id,updates)=>{
    return(dispatch)=>{
        const{
            id=0,
            building='',
            number=0,
            capacity=0,
            equipment='',
            offsite=0,
            type=''
        }= updates;
        const update = {id,building,number,capacity,equipment,offsite,type};
        return axios({
            url: `http://104.196.55.103:443/product/locations/updateLocation.php?id=${id}&roomNum=${number}&equipment=${equipment}&capacity=${capacity}&offsite=${offsite}&roomType=${type}&building=${building}`,
            method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'}
         })
         .then((response)=>{
             dispatch(editRoom(id,updates));
             console.log("Room updated");
         })
         .catch((response)=>{
             console.log("Failed to update room");
         });
    };
};


export const setRoom = (room)=>({
    type:'SET_ROOM',
    room
})

export const startSetRoom = ()=>{
    return(dispatch,getState)=>{
        return axios.get("http://104.196.55.103:443/product/locations/getLocations.php")
            .then((response)=>{
                const room = response.data.data;
                const roomArray =[];
                room.forEach((roomData)=>{
                    
                    roomArray.push({
                        id:roomData.id,
                        building:roomData.building,
                        type:roomData.room_type,
                        number:roomData.room_num,
                        equipment:roomData.equipment,
                        capacity: roomData.capacity,
                        offsite:roomData.offsite
                    });

                });
                dispatch(setRoom(roomArray));
            })
    }
};