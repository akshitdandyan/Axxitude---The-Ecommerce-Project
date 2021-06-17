import React, { useEffect, useState } from 'react'
import './userprofile.css'
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import sampledp from '../../media/sampleImages/sampleuserdp.jpg'
import { setNewPopUp } from '../actions/actions';
function UserProfile() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [userData,setUserData] = useState({})
    useEffect(() => {
        if(localStorage.getItem("profile")===null){
            history.push("/")
            const popUpData = {title:"Access Denied",body:"You are currently logged out."};
            dispatch(setNewPopUp(popUpData))
            return
        }
        setUserData(JSON.parse(localStorage.getItem("profile")).newUser)
    }, [])
    return (
        userData.length?<h1 className="signedOut">YOU ARE SIGNED OUT</h1>:
        <div className="user_profile">
            <div className="profile_header">
                <h2>We are pleased to see you as a family member.</h2>
            </div>
            <div className="user_profile_container">
                <div className="upper">
                    <div className="dp">
                        <img src={userData.image?userData.image:sampledp} alt="dp" />
                    </div> 
                    <div className="primary_data">
                        <div className="user_profile_data">
                            <h3>Name <p>{userData.firstname} {userData.lastname}</p></h3>
                       </div>
                        <div className="user_profile_data">
                            <h3>Email <p>{userData.email}</p></h3>
                        </div>
                    </div>
                </div>
                <div className="lower">
                    {!userData.googleUser &&
                    <>
                     <div className="user_profile_data">
                        <h3>Address <p>{userData.address}</p></h3>
                    </div>
                    <div className="user_profile_data">
                        <h3>Phone <p>{userData.phone}</p></h3>
                    </div>
                    </>
                    }
                    <div className="user_profile_data">
                        <h3>Joined Axxitude on <p>{userData.createdAt}</p></h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;

