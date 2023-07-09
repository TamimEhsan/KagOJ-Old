const statReducer=(state={
    right:0,
    wrong:0
},action)=>{
    switch(action.type){
        case 'STAT_UPDATE':
            return action.data;
        default:
            return state;
    }
}

export default statReducer;
