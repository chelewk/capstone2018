const roomReducerDefaultState= [];

const roomReducer=(state=roomReducerDefaultState,action)=>{
    switch(action.type){
        case 'ADD_ROOM':
            return [
                ...state,
                action.room
            ];
        case 'REMOVE_ROOM':
            return state.filter(({id})=>
                (id!== action.id)
                );
        case 'EDIT_ROOM':
                return state.map((room)=>{
                    if(room.id===action.id){
                        return{
                            ...room,
                            ...action.updates
                        }
                    }
                    else{
                        return room;
                    }
                });
        case 'SET_ROOM':
                return action.room;
        case 'LOGOUT':
                return roomReducerDefaultState;
        default:
                return state;
    }  
};

export default roomReducer;