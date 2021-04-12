import React from 'react';
import './signin.css';
import {useDispatch} from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../actions/actions.js';
import {useHistory} from 'react-router-dom'
function Signin() { 
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const onsubmit = (userCredentials) =>{
        dispatch(loginUser(userCredentials));
    }
    return (
        <div className="signin">
            <div className="signinheading"><h1>Sign In</h1></div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div>
                    <label>Email</label>
                    <input type="email" {...register('email')} required />
                    <br />
                    <label>Password</label>
                    <input type="password" {...register('password')} required />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Signin
