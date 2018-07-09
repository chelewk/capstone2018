const instructorReducerDefaultState= [];

const instructorReducer=(state=instructorReducerDefaultState,action)=>{
    switch(action.type){
        case 'SET_INSTRUCTOR':
            return action.instructor;
        case 'LOGOUT':
                return instructorReducerDefaultState;
        default:
                return state;
    }  
};

export default instructorReducer;