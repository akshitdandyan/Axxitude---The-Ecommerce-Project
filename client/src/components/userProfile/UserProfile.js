import React from 'react'
import './userprofile.css'
import {useSelector} from 'react-redux';
import sampledp from '../../media/sampleImages/sampleuserdp.jpg'
function UserProfile() {
    const isLoggedIn = useSelector(state => state.isLoggedReducer)
    const profileData =isLoggedIn[1]
    // {firstname:'John',lastname:'Cena',email:'john@cena.io',address:'Miami',occupation:'Wrestler',phone:'1823736744',createdAt:'19-04-2017'}
    return (
        !isLoggedIn?<h1 className="signedOut">YOU ARE SIGNED OUT</h1>:
        <div className="user_profile">
            <div className="profile_header">
                <h2>We are pleased to see you as a family member.</h2>
            </div>
            <div className="user_profile_container">
                <div className="upper">
                    <div className="dp">
                        <img src={profileData.image?profileData.image:sampledp} alt="dp" />
                    </div> 
                    <div className="primary_data">
                        <div className="user_profile_data">
                            <h3>Name <p>{profileData.firstname} {profileData.lastname}</p></h3>
                       </div>
                        <div className="user_profile_data">
                            <h3>Email <p>{profileData.email}</p></h3>
                        </div>
                    </div>
                </div>
                <div className="lower">
                    <div className="user_profile_data">
                        <h3>Address <p>{profileData.address}</p></h3>
                    </div>
                    <div className="user_profile_data">
                        <h3>Phone <p>{profileData.phone}</p></h3>
                    </div>
                    <div className="user_profile_data">
                        <h3>Profession <p>{profileData.occupation}</p></h3>
                    </div>
                    <div className="user_profile_data">
                        <h3>Joined Axxitude on <p>{profileData.createdAt}</p></h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;

