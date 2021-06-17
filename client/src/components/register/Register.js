import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './register.css';
import { registerUser, setNewPopUp } from '../actions/actions.js';
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { Helmet } from 'react-helmet';
import AuthProcess from '../../Loading/AuthProcess';
import google_svg from '../../media/google-icon.svg'
import GoogleAuth from './GoogleAuth';

const Register = () => {
    const inputElFilo = useRef(null);
    const [dp,setDp] = useState("")
    const history = useHistory();
    const [newUserData, setNewUserData] = useState({ firstname: '', lastname: '', email: '', address: '', phone: '', password: '', cpassword: '', image: '',googleUser:false })
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState(false)
    const [switchedToManual, setSwitchToManual] = useState(true)
    const onSubmit = async (e) => {
        e.preventDefault()
        if (newUserData.password !== newUserData.cpassword) {
            const popUpData = { title: "Passwords Not Matching", body: "Go Grab some coffee, you should be active while signing up" };
            dispatch(setNewPopUp(popUpData))
            return
        }
        setIsProcessing(true)
        const result = await dispatch(registerUser({newUser:newUserData}));
        if (result === false) {
            const popUpData = { title: "Error", body: "An account with this email id is already registered. Try Another One" };
            dispatch(setNewPopUp(popUpData))
        } else if (result === true) {
            history.push('/');
        }
    };

    return (
        <div className='registerContainer'>
            {isProcessing && <AuthProcess />}
            <div className="register">
                <Helmet><title>Axxitude | Register</title></Helmet>
                <div className="registerheading">
                    <h1>Register on Axxitude</h1>
                </div><br />
                <div className='switcherRegisterType'>
                    <div className={switchedToManual && 'activeR'} onClick={() => setSwitchToManual(true)}><div>Sign Up Manually &nbsp;<i className="fas fa-user"></i></div></div>
                    <div className={!switchedToManual && 'activeR'} onClick={() => setSwitchToManual(false)}><div>Sign In With Google</div> <img src={google_svg} alt='google-switcher' /></div>
                </div>
                {switchedToManual ? <form onSubmit={onSubmit} encType="multipart/form-data" >
                    <div className="basicdetails">
                        <div>
                        <span>
                            <input type="text" placeholder="First Name" name="firstname" autoFocus onChange={(e) => setNewUserData({ ...newUserData, firstname: e.target.value })} required />
                        </span>
                        <span>
                            <input type="text" placeholder="Last Name" name="lastname" onChange={(e) => setNewUserData({ ...newUserData, lastname: e.target.value })} required />
                        </span>
                        <span>
                            <input type="email" placeholder="Email" name="email" onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} required />
                        </span>
                        </div>
                    </div>
                    <div className="moredetails">
                        <div>
                                <span>
                                    <input type="text" placeholder="Address" name="address" onChange={(e) => setNewUserData({ ...newUserData, address: e.target.value })} required />
                                </span>
                                <span>
                                    <input type="number" placeholder="Phone" name="phone" onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })} required />
                                </span>
                                <span>
                                    <input type="password" placeholder="Choose Password" name="password" onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} required minLength="8" />
                                </span>
                                <span>
                                    <input type="password" placeholder="Confirm Password" name="cpassword" onChange={(e) => setNewUserData({ ...newUserData, cpassword: e.target.value })} required minLength="8" />
                                </span>
                                <span className="imageInput">
                                    <FileBase type="file"   multiple={false} onDone={({ base64 }) => setNewUserData({ ...newUserData, image: base64 })} />
                                </span>
                                <input style={{display:'none'}} type="file" ref={inputElFilo} 
                                    onChange={(event) => {
                                        const fileUploaded = event.target.files[0];
                                        const reader = new FileReader();
                                        reader.readAsDataURL(fileUploaded)
                                        reader.onload=()=>{
                                            setNewUserData({ ...newUserData, image: reader.result })
                                        }
                                        setDp(fileUploaded?.name);
                                }}/>
                                <span>
                                    <div className="IMAGEINPUT" onClick={()=>inputElFilo.current.click()}><i className="fas fa-camera-retro"></i> {dp==""?"Choose":'Change'} Display Picture</div>
                                </span>
                                <p className='dpselected'>{dp}</p>
                        </div>
                            <button type="submit">Register</button>
                    </div>
                </form>
                    :
                    <GoogleAuth />
                }

            </div>
        </div>
    )
}

export default Register;
