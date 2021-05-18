import React,{useState} from 'react';
import './signin.css';
import {useDispatch} from 'react-redux';
import { loginUser, setNewPopUp } from '../actions/actions.js';
import {useHistory} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AuthProcess from '../../Loading/AuthProcess'

function Signin() { 
    const dispatch = useDispatch();
    const history = useHistory();
    const [userCredentials,setUserCredentials]=useState({email:'',password:''})
    const [rotate,setRotate] = useState(false)
    const onsubmit = async(e) =>{
        e.preventDefault()
        setRotate(true)
        const res = await dispatch(loginUser(userCredentials));
        if(res){
            history.push("/")
        }else{
            setRotate(false)
            const popUpData = {title:"Invalid Credentials",body:"If you have not account you can do sign up. It won't take more than a minute"};
            dispatch(setNewPopUp(popUpData))
            return
        }
    }
    return (
        <div className='sigin_container'>
        <div className="signin">
            <Helmet><title>Axxitude | Sign In</title></Helmet>
            {rotate && <AuthProcess />}
            <div className="signinheading"><h1>Sign In</h1></div>
            <form>
                <div className='signin_inputs'>
                    <label>Email</label>
                    <input type="email" onChange={(e)=>setUserCredentials({...userCredentials,email:e.target.value})} required />
                    <br />
                    <label>Password</label>
                    <input type="password" onChange={(e)=>setUserCredentials({...userCredentials,password:e.target.value})} required />
                </div>
                <button onClick={onsubmit}>Log In</button>
            </form>
        </div>
        </div>
    )
}

export default Signin
