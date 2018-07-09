const dealineReducerDefaultState= [];

const deadlineReducer=(state=dealineReducerDefaultState,action)=>{
    switch(action.type){
        case 'ADD_DEADLINE':
            return [
                ...state,
                action.deadline
            ];
        case 'REMOVE_DEADLINE':
            return state.filter(({id})=>
                (id!== action.id)
                );
        case 'EDIT_DEADLINE':
                return state.map((deadline)=>{
                    if(deadline.id===action.id){
                        return{
                            ...deadline,
                            ...action.updates
                        }
                    }
                    else{
                        return deadline;
                    }
                });
        case 'SET_DEADLINE':
                return action.deadline;
        case 'LOGOUT':
                return dealineReducerDefaultState;
        default:
                return state;
    }  
};

export default deadlineReducer;