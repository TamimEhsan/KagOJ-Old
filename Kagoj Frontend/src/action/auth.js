import axios from 'axios'
import Cookies from 'universal-cookie';
import {base_url} from '../'
import {setLoading, showToast} from "../App";
const cookies = new Cookies();

const COOKIE_AGE=315360000

export const checkAuth=(dispatcher)=>{
    //console.log(cookies.get('token'))
    if(cookies.get('token')==undefined || cookies.get('token')==null)
        dispatcher(logoutDispatch())
    else
        dispatcher(loginDispatch())
}

export const googleAuth=(data,dispatcher,history)=>{
    setLoading(true)
    axios.post(base_url+'auth/googleoauth',data).then(res=>{
        cookies.set('token',res.data.token,{ path: '/', maxAge: COOKIE_AGE })
        checkAuth(dispatcher)
        history.push('/lang/en/level/1')
        setLoading(false)
        showToast('Logged in successfully')
    }).catch(err=>{
        console.log(err)
        checkAuth(dispatcher)
        setLoading(false)
    })
}

export const register=(data,dispatcher,history)=>{
    setLoading(true)
    axios.post(base_url+'auth/registration',data).then(res=>{
        if(!('error' in res.data)){
            //console.log(res.data.token)

            //console.log(cookies.get('token'))
            cookies.set('token',res.data.token,{ path: '/', maxAge: COOKIE_AGE })

            checkAuth(dispatcher)

            history.push('/lang/en/level/1')
            setLoading(false)
            showToast('Registered successfully')
        }else{
            setLoading(false)
            showToast(res.data.error)
            checkAuth(dispatcher)
        }
    }).catch(err=>{
        //console.log(err)
        setLoading(false)
        showToast('Error Occurred')
        checkAuth(dispatcher)
    })
}

export const login=(data,dispatcher,history)=>{
    console.log("Inside login 3");
    console.log(data);
    console.log("Inside login 2");
    setLoading(true)
    axios.post(base_url+'auth/login',data).then(res=>{
        if(!('error' in res.data)){
            console.log("vallage na mara jabo");
            cookies.set('token',res.data.token,{ path: '/', maxAge: COOKIE_AGE })
            checkAuth(dispatcher)
            history.push('/course')
            setLoading(false)
            showToast('Logged in successfully')
        }else{
            console.log("vallage na");
            setLoading(false)
            showToast(res.data.error)
            checkAuth(dispatcher)
        }
    }).catch(err=>{
        console.log("vallage na mara jabo");
        console.log(err)
        setLoading(false)
        showToast('Error Occurred')
        checkAuth(dispatcher)
    })
}

export const logout=(dispatcher)=>{
    cookies.remove('token',{ path: '/' })
    checkAuth(dispatcher)
    window.location.reload();
}

const loginDispatch=()=>{
    return {
        type:'SIGNED_IN'
    }
}
const logoutDispatch=()=>{
    return {
        type:'SIGNED_OUT'
    }
}
