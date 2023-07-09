const profileReducer=(state=null,action)=>{
    switch(action.type){
        case 'PROFILE_UPDATE':
            return action.data;
        default:
            return state;
    }
}

export default profileReducer;
