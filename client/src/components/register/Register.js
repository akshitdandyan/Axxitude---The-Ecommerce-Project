import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch,useSelector } from 'react-redux'; 
import './register.css';
import { registerUser } from '../actions/actions.js';
import {useHistory} from 'react-router-dom';

function Register() {
    const isLoggedIn = useSelector(state => state.isLoggedReducer)
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        dispatch(registerUser(data));
        if(isLoggedIn[0]){
            console.log(isLoggedIn)
        history.push('/')
        }
    };
    return (
        <div className="register">
            <div className="registerheading">
                <h1>Register on Axxitude</h1>
            </div><br />
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="basicdetails">
                    <span>
                        <label>First Name</label>
                        <input type="text" name="firstname" {...register('firstname')} required />
                    </span>
                    <span>
                        <label>Last Name</label>
                        <input type="text" name="lastname" {...register('lastname')} required />
                    </span>
                    <span>
                        <label>Email</label>
                        <input type="email" name="email" {...register('email')} required />
                    </span>
                </div>
                <div className="moredetails">
                    <div>
                        <span>
                            <label>Address</label>
                            <input type="text" name="address" {...register('address')} required />
                        </span>
                        <span>
                            <label>Occupation</label>
                            <input type="text" name="occupation" {...register('occupation')} required />
                        </span>
                        <span>
                            <label>Phone</label>
                            <input type="number" name="phone" {...register('phone')} required />
                        </span>
                        <span>
                            <label>Choose Password</label>
                            <input type="password" name="password" {...register('password')} required minLength="8" />
                        </span>
                        <span>
                            <label>Confirm Password</label>
                            <input type="password" name="cpassword" {...register('cpassword')} required minLength="8" />
                        </span>
                        <span>
                            <label>Choose a cool profile picture</label>
                            <input type="file" name="image" {...register('image')}  />
                        </span>
                        <button type="submit">Register</button>
                    </div>
                    <div className="logogif"></div>
                </div>
            </form>

        </div>
    )
}

export default Register;
