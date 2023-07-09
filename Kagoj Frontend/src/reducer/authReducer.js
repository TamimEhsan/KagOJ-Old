const authReducer=(state=0,action)=>{
    switch(action.type){
        case 'SIGNED_IN':
            return 1;
        case 'SIGNED_OUT':
            return 0;
        default:
            return state;
    }
}

export default authReducer;
