import axios from 'axios'
import Cookies from 'universal-cookie';
import {base_url} from '../'
const cookies = new Cookies();

export const fetchProfile=(dispatcher)=>{
    axios.get(base_url+'profile',{headers:{authorization:cookies.get('token')}}).then(res=>{
        console.log(res.data);
        dispatcher(profileDispatch(res.data))
    }).catch(err=>{
        //console.log(err)
    })
}

export const statUpdate=(dispatcher,data)=>{
    //console.log('##############')
    //console.log(data)
    dispatcher(statDispatch(data))
}




const profileDispatch=data=>{
    return{
        type:'PROFILE_UPDATE',
        data:data
    }
}



const statDispatch=data=>{
    return{
        type:'STAT_UPDATE',
        data:data
    }
}
