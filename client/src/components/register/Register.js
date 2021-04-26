import React,{useState} from 'react';
import { useDispatch} from 'react-redux'; 
import './register.css';
import { registerUser } from '../actions/actions.js';
// import {useHistory} from 'react-router-dom';
import FileBase from 'react-file-base64';
import { loginUser } from '../actions/actions.js';
import { Helmet } from 'react-helmet';

function Register() {
    // const isLoggedIn = useSelector(state => state.isLoggedReducer)
    // const history = useHistory();
    const [newUserData,setNewUserData]=useState({firstname:'',lastname:'',email:'',address:'',occupation:'',phone:'',password:'',cpassword:'',image:''})
    const dispatch = useDispatch();
    const onSubmit = async(e) => {
        e.preventDefault()
        if (newUserData.password!==newUserData.cpassword){
            window.alert("CHECK PASSWORDS AGAIN")
        }
        await dispatch(registerUser(newUserData));
        const loginCredentials={email:newUserData.email,password:newUserData.password}
        dispatch(loginUser(loginCredentials));
    };
    return (
        <div className="register">
            <Helmet><title>Register</title></Helmet>
            <div className="registerheading">
                <h1>Register on Axxitude</h1>
            </div><br />
            <form onSubmit={onSubmit} encType="multipart/form-data" >
                <div className="basicdetails">
                    <span>
                        <label>First Name</label>
                        <input type="text" name="firstname" onChange={(e) => setNewUserData({ ...newUserData, firstname: e.target.value })} required />
                    </span>
                    <span>
                        <label>Last Name</label>
                        <input type="text" name="lastname" onChange={(e) => setNewUserData({ ...newUserData, lastname: e.target.value })} required />
                    </span>
                    <span>
                        <label>Email</label>
                        <input type="email" name="email" onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} required />
                    </span>
                </div>
                <div className="moredetails">
                    <div>
                        <span>
                            <label>Address</label>
                            <input type="text" name="address" onChange={(e) => setNewUserData({ ...newUserData, address: e.target.value })} required />
                        </span>
                        <span>
                            <label>Occupation</label>
                            <input type="text" name="occupation" onChange={(e) => setNewUserData({ ...newUserData, occupation: e.target.value })} required />
                        </span>
                        <span>
                            <label>Phone</label>
                            <input type="number" name="phone" onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })} required />
                        </span>
                        <span>
                            <label>Choose Password</label>
                            <input type="password" name="password" onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} required minLength="8" />
                        </span>
                        <span>
                            <label>Confirm Password</label>
                            <input type="password" name="cpassword" onChange={(e) => setNewUserData({ ...newUserData, cpassword: e.target.value })} required minLength="8" />
                        </span>
                        <span>
                            <label>Choose a cool profile picture</label>
                            <FileBase type="file" multiple={false} onDone={({base64})=>setNewUserData({...newUserData,image:base64})} />
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
