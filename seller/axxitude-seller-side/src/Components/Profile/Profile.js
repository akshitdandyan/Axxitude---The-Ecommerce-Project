import './Profile.css';
import React from 'react'
import AVATARMALE from '../../Media/IMAGES/avatar_male.jpg';
import AVATARFEMALE from '../../Media/IMAGES/avatar_female.png';
import { useSelector } from 'react-redux';

function Profile() {
    console.log("PROFILE");
    const seller_data =  useSelector((state) => state.sellerdata)
    var details =  seller_data[0];

    return (
        details === undefined?<h1 style={{color:"white",textAlign:"center",margin:"0px",padding:"50px"}}>Loading...</h1>:
        <div className='profile'>
            <div className='upper_profile_section'>
                <div className='profile_picture'>
                    <img src={!details.ProfilePicture?details.Gender==='Male'?AVATARMALE:AVATARFEMALE:details.ProfilePicture} alt="display" />
                </div>
                <div className='upper_profile_details'>
                    <p>Name :    <span>{details.Fullname}</span> </p>
                    <p>Email  :  <span>{details.Email}</span></p>
                    <p>Phone :   <span>{details.ContactNumber}</span></p>
                    <p>Gender :  <span>{details.Gender}</span></p>
                </div>
            </div>
            <div className='lower_profile_section'>
                <p>Business Name :<br/> <span>{details.BusinessName}</span></p>
                <p>Type Of Business :<br/> <span>{details.BusinessType}</span></p>
                <p>Your pick up Store Address :<br/> <span>{details.StoreAddress}</span></p>
                <p>Total Products Launched :<br/>  <span>{details.TotalProducts}</span></p>
                <p>Total Products Sold :<br/> <span> 0</span></p>
                <p>Products Added in Cart:<br />  <i className='premium'>You need to take premium plan to access this feature.</i></p>
            </div>
        </div>
    )
}

export default Profile
