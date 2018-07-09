const conflictReducerDefaultState=[];

const conflictReducer=(state=conflictReducerDefaultState,action)=>{
    switch(action.type){
        case 'ADD_CONFLICT':
            return[
                ...state,
                action.conflict
            ];
        case 'REMOVE_CONFLICT':
            return state.filter(({id=''})=>id !==action.id);
        case 'SET_CONFLICT':
            const finalArray=[
                ...state,
                action.conflict
            ];
            const uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
            return uniqueArray(finalArray);
        case 'LOGOUT':
                return conflictReducerDefaultState;
        default:
                return state;
    }
};

export default conflictReducer;