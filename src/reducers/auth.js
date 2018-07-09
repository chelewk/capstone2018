const authReducerDefaultState=[];

const authReducer=(state=authReducerDefaultState,action)=>{
    switch(action.type){
        case 'LOGIN':
            return[
                ...state,
                action.user
            ];
        case 'UPDATE_USER':
            return state.map((auth)=>{
                if(auth.cwid===action.cwid){
                    return{
                        ...auth,
                        ...action.updates
                    }
                }
            });
        case 'LOGOUT':
            return authReducerDefaultState;
        default:
            return state;
    }
};

export default authReducer;