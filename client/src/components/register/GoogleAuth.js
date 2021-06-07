import React from 'react';
import { GoogleLogin } from 'react-google-login';
import google_svg from '../../media/google-icon.svg';
import { useDispatch } from 'react-redux';
import { registerUser, setNewPopUp } from '../actions/actions';
import { useHistory } from 'react-router';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const googleSuccess = async(res) => {
        const userDataFromGoogle = res?.profileObj;
        const newUser = { firstname: userDataFromGoogle.givenName,lastname: userDataFromGoogle.familyName,email:userDataFromGoogle.email,image:userDataFromGoogle.imageUrl,googleUser:true};
        const tokenID = res?.tokenId;
        const result = dispatch(registerUser({ newUser,tokenID }));
        if(result){
            history.push('/')
            window.location.reload()
        }
    }

    const googleFailure = () => {
        console.error("GOOGLE signing into AXXITUDE failed")
        const popUpData = { title: "Error", body: "Try later or sign up manually" };
        dispatch(setNewPopUp(popUpData))
    }
    return (
        <div className='google_auth_container'>
            <GoogleLogin 
                clientId="982502230686-6irjue0cm9pt6tgj7jt52bvumc87ibet.apps.googleusercontent.com"
                render={(renderProps)=>(
                    <div className='googleAuthContainer' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <div>
                                <div>USE GOOGLE SIGN IN TO DIVE INTO AXXITUDE</div> <img src={google_svg} alt='google' />
                            </div>
                    </div>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
            />
        </div>
    )
}

export default GoogleAuth
