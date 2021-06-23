import React, { useEffect, useState } from 'react'
import './userprofile.css'
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import sampledp from '../../media/sampleImages/sampleuserdp.jpg'
import { logoutUser, setNewPopUp } from '../actions/actions';
import Loader from '../../Loading/AuthProcess';
import { deleteAccount, updateProfile } from '../api';

function EditButton({text, setEditState,setLoading, userData,dispatch}){
    async function foo(){
        if(text==="Edit"){
            setEditState(true)
        }else{
            setLoading(true)
            setEditState(false)
            const res = await updateProfile(userData)
            if(res) {
                const popUpData = { title: "Profile Updated", body: "Refresh 2-3 times to see updates in your profile. Have a good day." };
                dispatch(setNewPopUp(popUpData))
                setLoading(false)
            }
        }
    }
    return(
        <div className="edit-button" onClick={()=>foo()}>{text}</div>
    )
}
function DeleteButton({id,setLoading,history,dispatch}){
    async function foo(){
        const res = await deleteAccount(id)
        setLoading(true)
        if(res){
            dispatch(logoutUser)
            const popUpData = { title: "Account Deleted", body: "If you founded any bug, give us a feedback or it would be good if you tell us us the reason of deleting your account." };
            dispatch(setNewPopUp(popUpData))
            history.push("/")
            setLoading(false)
        }else{
            const popUpData = { title: "Cannot Perform Action", body: "Please try after a while. Try checking your connection." };
            dispatch(setNewPopUp(popUpData))
        }
    }
    return(
        <div className="delete-button" onClick={()=>foo()}>Delete Account</div>
    )
}

function UserProfile() {
    const dispatch = useDispatch()
    const [editState,setEditState] = useState(false)
    const [loading,setLoading] = useState(false)
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
            {loading && <Loader />}
            <div className="profile_header">
                {!userData.googleUser?<h2>Hello {userData.firstname}, here you can edit your account details and thanks for being with us.</h2>:
                <h2>Thanks for being with us.💖</h2>}
            </div>
            <div className="user_profile_container">
                <div className="upper">
                    <div className="dp">
                        <img src={userData.image?userData.image:sampledp} alt="dp" />
                    </div> 
                    <div className="primary_data">
                        <div className="user_profile_data">
                            {!editState?<h3>Name <p>{userData.firstname} {userData.lastname}</p></h3>:
                            <>
                            <input value = {userData.firstname} onChange={e=>setUserData({...userData,firstname:e.target.value})} />  
                            <input value = {userData.lastname} onChange={e=>setUserData({...userData,lastname:e.target.value})} />  
                            </>
                            }
                            {!userData.googleUser &&<div className='edit-delete'>
                            <EditButton text={editState?"Save":"Edit"} setEditState={setEditState} setLoading={setLoading} userData={userData} dispatch={dispatch}/>
                            {!editState && <DeleteButton history={history} dispatch={dispatch} id={userData._id} setLoading={setLoading} />}
                            </div>}
                       </div>
                        <div className="user_profile_data">
                            {!editState?<h3>Email <p>{userData.email}</p></h3>:
                            <input value = {userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} />  
                            }
                        </div>
                    </div>
                </div>
                <div className="lower">
                    {!userData.googleUser &&
                    <>
                     <div className="user_profile_data">
                        {!editState?<h3>Address <p>{userData.address}</p></h3>:
                        <input value = {userData.address} onChange={e=>setUserData({...userData,address:e.target.value})} />
                        }
                    </div>
                    <div className="user_profile_data">
                        {!editState?<h3>Phone <p>{userData.phone}</p></h3>:
                        <input value = {userData.phone} onChange={e=>setUserData({...userData,phone:e.target.value})} />
                        }
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

