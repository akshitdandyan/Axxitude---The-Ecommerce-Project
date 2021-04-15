import React,{useState} from 'react';
import './signin.css';
import {useDispatch} from 'react-redux';
import { loginUser } from '../actions/actions.js';
function Signin() { 
    const dispatch = useDispatch();
    const [userCredentials,setUserCredentials]=useState({email:'',password:''})
    const onsubmit = (e) =>{
        e.preventDefault()
        dispatch(loginUser(userCredentials));
    }
    return (
        <div className="signin">
            <div className="signinheading"><h1>Sign In</h1></div>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" onChange={(e)=>setUserCredentials({...userCredentials,email:e.target.value})} required />
                    <br />
                    <label>Password</label>
                    <input type="password" onChange={(e)=>setUserCredentials({...userCredentials,password:e.target.value})} required />
                </div>
                <button onClick={onsubmit}>Log In</button>
            </form>
        </div>
    )
}

export default Signin
