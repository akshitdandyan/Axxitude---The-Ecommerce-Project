import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import {getUserDataToLogin} from '../Api'
import './Login.css'
import { useDispatch } from 'react-redux'
import { login_user } from '../Actions'
import AuthProcess from './AuthProcess';
import {setNewPopUp} from '../Actions/index'

function Login() {
    const dispatch = useDispatch();
    const History = useHistory()
    const [rotate,setRotate] = useState(false)
    const [loginCredentials,setLoginCredentials] = useState({Email:'',Password:''})
    const [wrongDetails,setWrongDetails] = useState(false)
    const Login = async() => {
        if(loginCredentials.Email === '' || loginCredentials.Password === '' ){
            setWrongDetails(true)
            return
        }
        const res = await getUserDataToLogin(loginCredentials.Email);
        if(res.data.length===0){
            const popUpData = {title:"Invalid Credentials",body:"Are you trying to hack someone's account"};
            dispatch(setNewPopUp(popUpData))
            return
        }

        const resPassword = res.data[0].Password;
        const filledPassword = loginCredentials.Password;
        

        if(filledPassword === resPassword){
            setRotate(true)
            localStorage.setItem("seller_account_email",loginCredentials.Email)
            localStorage.setItem("seller_account_password",filledPassword)
            await dispatch(login_user(loginCredentials.Email))
            History.push("/dashboard")
        }else{
            const popUpData = {title:"Invalid Credentials",body:"Are you trying to hack someone's account"};
            dispatch(setNewPopUp(popUpData))
            return
        }
    } 
    return (
        <div className= 'login'>
            {rotate && <AuthProcess/>}
            <div className='header-register-component-merge-effect-1'></div>
            <div className={wrongDetails?'invalid_login_credentials invalid_login_credentials_visible':'invalid_login_credentials'}>
                <p onClick={()=>setWrongDetails(false)}>x</p>
                <h3 style={{color:"black"}}>Invalid Credentials. If you have no account, you can sign up.</h3>
            </div>
                <div className='login_form axx-form'>
                    <label >Email</label>
                    <input type='email' required onChange={(e)=>setLoginCredentials({...loginCredentials,Email:e.target.value})} />
                    <label >Password</label>
                    <input type='password' required onChange={(e)=>setLoginCredentials({...loginCredentials,Password:e.target.value})} />
                    <button type='submit' className='login_btn' onClick={Login}>Login</button>
                </div>
            <div className='header-register-component-merge-effect-2'></div>
        </div>
    )
}

export default Login
