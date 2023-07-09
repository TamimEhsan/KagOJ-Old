import React, {useEffect, useRef} from 'react'
import '../../css/generic.css'
import '../../css/auth.css'
import auth_bg from '../../assets/login_bg.png'
import auth_eye from '../../assets/login eye.png'
import auth_key from '../../assets/login key.png'
import auth_username from '../../assets/login username.png'
import google_icon from '../../assets/google-icon.png'
import back_icon from '../../assets/back_icon.png'
import {BrowserRouter,Route,Switch} from "react-router-dom";
import GoogleLogin from "react-google-login";
import {googleAuth, login, register} from "../../action/auth";
import {useDispatch} from "react-redux";
import {showToast} from "../../App";


const Auth=props=>{

    const dispatch=useDispatch()

    const googleAuthComplete=res=>{
        //console.log(res)
        if(res.accessToken!=undefined) {
            googleAuth({access_token: res.accessToken}, dispatch,props.history)
        }
    }

    return(
        <div className={'auth-container'}>
            <div className={'auth-home-container'} onClick={()=>{props.history.push('/')}}>
                <img src={back_icon}/>
                Home
            </div>
            <div className={'auth-left-container'}>
                <img src={auth_bg}/>
                <div className={'auth-left-title'}>
                    Your Journey to <b>Greatness</b> Starts here.
                </div>
            </div>
            <div className={'auth-right-container'}>
                <div className={'auth-right-inner-container'}>
                    <div className={'auth-right-title'}>
                        Welcome Learner
                    </div>
                    <div className={'auth-right-blue-divider'}/>
                    <BrowserRouter history={props.history}>
                        <Switch>
                            <Route path={'/auth/login'} component={LoginForm}/>
                            <Route path={'/auth/register'} component={RegisterForm}/>
                        </Switch>
                    </BrowserRouter>
                    <div className={'auth-or-container'}>
                        <div className={'auth-or-divider'}/>
                        <div className={'auth-or'}>
                            OR
                        </div>
                        <div className={'auth-or-divider'}/>
                    </div>
                    <GoogleLogin
                        clientId="384400786106-ep0igg2mrvq1f3vkvavpdlt7pkcp3d34.apps.googleusercontent.com"
                        render={renderProps => (
                            <div onClick={renderProps.onClick} disabled={renderProps.disabled} className={'auth-google-container'}>
                                <div className={'auth-google-left-container'}>
                                    <img src={google_icon}/>
                                </div>
                                <div className={'auth-google-right-container'}>
                                    Continue with Google
                                </div>
                            </div>
                        )}
                        buttonText="Login"
                        onSuccess={googleAuthComplete}
                        onFailure={googleAuthComplete}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </div>
    )
}

const LoginForm=props=>{

    const dispatch=useDispatch()

    const loginRef=useRef()
    const passRef=useRef()

    const loginClick=()=>{
        var loginString=loginRef.current.value
        var passwordString=passRef.current.value
        if(loginString.length===0 || passwordString.length===0)
            showToast('Please enter valid login and password')
        else{
            login({
                email:loginString,
                password:passwordString
            },dispatch,props.history)
        }
    }

    return(
        <div className={'login-container'}>
            <div className={'auth-text'}>
                <img src={auth_username} className={'auth-drawable-left'}/>
                <div className={'auth-verticle-divider'}/>
                <input ref={loginRef} type="text" placeholder="Username/Email/Phone"/>
            </div>
            <div className={'auth-text'}>
                <img src={auth_key} className={'auth-drawable-left'}/>
                <div className={'auth-verticle-divider'}/>
                <input ref={passRef} type="password" placeholder="Password"/>
                <img src={auth_eye} className={'auth-drawable-right'}/>
            </div>
            <div className={'auth-action-container'}>
                <label className="container">Remember Me
                    <input type="checkbox"/>
                    <span className="checkmark"></span>
                </label>
                <button onClick={loginClick}>
                    Login
                </button>
            </div>
            <div className={'auth-forgot-container'}>
                <p>
                    Forgot password ?
                </p>
            </div>
            <div className={'auth-different'}>
                Don't have an Account ?
            </div>
            <button className={'auth-different-button'}  onClick={()=>{props.history.push('/auth/register')}}>
                Register Now
            </button>
        </div>
    )
}

const RegisterForm=props=>{

    const dispatch=useDispatch()

    const nameRef=useRef()
    const loginRef=useRef()
    const passRef=useRef()
    const rePassRef=useRef()

    const regClick=()=>{
        var nameString=nameRef.current.value
        var loginString=loginRef.current.value
        var passString=passRef.current.value
        var repassString=rePassRef.current.value

        if(nameString.length===0 || loginString.length===0 || passString.length===0 || repassString.length===0)
            showToast('Please fill up the fields properly...')
        else{
            if(passString!==repassString)
                showToast('Please re-enter the password correctly')
            else{
                register({
                    name:nameString,
                    phone:loginString,
                    password:passString
                },dispatch,props.history)
            }
        }
    }


    return(
        <div className={'login-container'}>
            <div className={'auth-text'}>
                <img src={auth_username} className={'auth-drawable-left'}/>
                <div className={'auth-verticle-divider'}/>
                <input ref={nameRef} type="text" placeholder="Your name"/>
            </div>
            <div className={'auth-text'}>
                <img src={auth_username} className={'auth-drawable-left'}/>
                <div className={'auth-verticle-divider'}/>
                <input ref={loginRef} type="text" placeholder="Username/Email/Phone"/>
            </div>
            <div className={'auth-text'}>
                <img src={auth_key} className={'auth-drawable-left'}/>
                <div className={'auth-verticle-divider'}/>
                <input ref={passRef} type="password" placeholder="Password"/>
                <img src={auth_eye} className={'auth-drawable-right'}/>
            </div>
            <div className={'auth-text'}>
                <img src={auth_key} className={'auth-drawable-left'}/>
                <div className={'auth-verticle-divider'}/>
                <input ref={rePassRef} type="password" placeholder="Retype Password"/>
                <img src={auth_eye} className={'auth-drawable-right'}/>
            </div>
            <div className={'auth-action-container'}>
                <label className="container">Remember Me
                    <input type="checkbox"/>
                    <span className="checkmark"></span>
                </label>
                <button onClick={regClick}>
                    Register
                </button>
            </div>
            <div className={'auth-different'}>
                Already have an Account ?
            </div>
            <button className={'auth-different-button'}  onClick={()=>{props.history.push('/auth/login')}}>
                Login
            </button>
        </div>
    )
}

export default Auth
