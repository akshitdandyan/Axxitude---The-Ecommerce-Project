import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import {getUserDataToLogin} from '../Api'
import './Login.css'
import { useDispatch } from 'react-redux'
import { login_user } from '../Actions'

function Login() {
    const dispatch = useDispatch();
    const History = useHistory()
    const [loginCredentials,setLoginCredentials] = useState({Email:'',Password:''})
    const [wrongDetails,setWrongDetails] = useState(false)
    const Login = async() => {
        const res = await getUserDataToLogin(loginCredentials.Email);
        const resPassword = res.data[0].Password;
        const filledPassword = loginCredentials.Password;
        if(loginCredentials.Email === '' || loginCredentials.Password === '' || res.data[0] === undefined || filledPassword !==resPassword){
            setWrongDetails(true)
            return
        }

        if(filledPassword === resPassword){
            console.log("Able to login")
            localStorage.setItem("seller_account_email",loginCredentials.Email)
            await dispatch(login_user(loginCredentials.Email))
            History.push("/dashboard")
        }
    } 
    return (
        <div className= 'login'>
            <div className='header-register-component-merge-effect-1'></div>
            <div className={wrongDetails?'invalid_login_credentials invalid_login_credentials_visible':'invalid_login_credentials'}>
                <p onClick={()=>setWrongDetails(false)}>x</p>
                <h3>Invalid Credentials. If you have no account, you can sign up.</h3>
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
