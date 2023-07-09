const langReducer=(state=null,action)=>{
    switch(action.type){
        case 'LANG_EN':
            return 'en';
        case 'LANG_BN':
            return 'bn';
        default:
            return state;
    }
}

export default langReducer;
