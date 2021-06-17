import React,{useState} from 'react';
import './signin.css';
import {useDispatch} from 'react-redux';
import { loginUser, registerUser, setNewPopUp } from '../actions/actions.js';
import {useHistory} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AuthProcess from '../../Loading/AuthProcess';
import google_svg from '../../media/google-icon.svg';
import { GoogleLogin } from 'react-google-login';

function Signin() { 
    const dispatch = useDispatch();
    const history = useHistory();
    const [userCredentials,setUserCredentials]=useState({email:'',password:''})
    const [rotate,setRotate] = useState(false)

    const googleSuccess = async(res) => {
        const userDataFromGoogle = res?.profileObj;
        const newUser = { firstname: userDataFromGoogle.givenName,lastname: userDataFromGoogle.familyName,email:userDataFromGoogle.email,image:userDataFromGoogle.imageUrl,googleUser:true};
        const tokenID = res?.tokenId;
        const result = dispatch(registerUser({ newUser,tokenID }));
        if(result){
            history.push('/')
            // window.location.reload()
        }
    }

    const googleFailure = () => {
        console.error("GOOGLE signing into AXXITUDE failed")
        const popUpData = { title: "Error", body: "Try later or sign up manually" };
        dispatch(setNewPopUp(popUpData))
    }

    const onsubmit = async(e) =>{
        e.preventDefault()
        setRotate(true)
        const res = await dispatch(loginUser(userCredentials));
        if(res){
            history.push("/")
            window.location.reload()
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
            <div className="signinheading">
                <div><i className="fas fa-user-circle"></i></div>
                <h1>Sign In</h1>
            </div>
            <form>
                <div className='signin_inputs'>
                    <input placeholder="Email" type="email" onChange={(e)=>setUserCredentials({...userCredentials,email:e.target.value})} required />
                    <br />
                    <input placeholder="Password" type="password" onChange={(e)=>setUserCredentials({...userCredentials,password:e.target.value})} required />
                </div>
                <button onClick={onsubmit}>Log In</button>
            </form>
            <GoogleLogin 
                clientId="982502230686-6irjue0cm9pt6tgj7jt52bvumc87ibet.apps.googleusercontent.com"
                render={(renderProps)=>(
                    <div className='googleAuthContainer loginGoogle' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <div>Sign In with Google</div> <img src={google_svg} alt='google' />
                    </div>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
            />
        </div>
        </div>
    )
}

export default Signin
