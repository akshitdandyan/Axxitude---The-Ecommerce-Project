import React, { useState } from 'react'
import './Register.css'
import { RegisterForSellerAccount } from './../Api'
import { useHistory } from 'react-router-dom'
import Filebase from 'react-file-base64'
import AuthProcess from '../Login/AuthProcess'
import { setNewPopUp } from '../Actions'
import { useDispatch } from 'react-redux'

function Register() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [arePasswordsMatching, checkPassWordsMacthing] = useState(true)
    const [isMale,setIsMale] = useState(true)
    const [rotate,setRotate] = useState(false)
    const [newAccountData, setNewAccountData] = useState({
        Fullname:'',
        BusinessName: '',
        BusinessType: '',
        StoreAddress: '',
        Email: '',
        Gender: 'Male',
        ContactNumber: '',
        Password: '',
        CPassword: '',
        ProfilePicture: ''
    })
    const HandleClick = async () => {
        if(newAccountData.Fullname==='' ||newAccountData.BusinessName=== '' ||newAccountData.BusinessType=== '' ||newAccountData.StoreAddress=== '' ||newAccountData.Email=== '' ||newAccountData.ContactNumber=== '' ||newAccountData.Password=== '' ||newAccountData.CPassword=== '' ){
            const popUpData = {title:"NO Way",body:"You also know you can't leave any of fields empty in order to register"};
            dispatch(setNewPopUp(popUpData))
            return
        }
        if (newAccountData.Password !== newAccountData.CPassword) {
            checkPassWordsMacthing(false)
            return;
        }
        try {
            if(!isMale){
                newAccountData.Gender="Female"
            }
            setRotate(true)
            const isRegistered = await RegisterForSellerAccount(newAccountData)
            if (isRegistered) {
                localStorage.setItem("seller_account_email", newAccountData.Email);
                history.push('/dashboard')
                //make seller login with reducers

            } else {
                const popUpData = {title:"Invalid Credentials",body:"An account with this email already exists."};
                dispatch(setNewPopUp(popUpData))
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className={arePasswordsMatching ? 'register_seller_account' : 'register_seller_account blurform'}>
            {rotate && <AuthProcess/>}
                <div className='header-register-component-merge-effect-1'></div>
                <div className='registration_form_container axx-form'>
                    <label>Full Name <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, Fullname: e.target.value })} />
                    <label>Your Email <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, Email: e.target.value })} />
                    <label>Phone Number</label>
                    <input type='number' required onChange={(e) => setNewAccountData({ ...newAccountData, ContactNumber: e.target.value })} />
                    <label>Gender</label>
                    <div className='gender_choose'>
                        <div className={!isMale?'gender_radio male':"gender_radio male male_filled"} onClick={()=>setIsMale(true)} ></div>
                        <div className='gender_label'>Male</div>
                        <div className={isMale?'gender_radio female':"gender_radio male female_filled"} onClick={()=>setIsMale(false)} ></div>
                        <div className='gender_label'>Female</div></div>
                    <label>Choose Business Name <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, BusinessName: e.target.value })} />
                    <label>Choose Business Type <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, BusinessType: e.target.value })} />
                    <label>Your Store Address <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, StoreAddress: e.target.value })} />
                    <label>Choose Password <span>*</span></label>
                    <input type='password' required onChange={(e) => setNewAccountData({ ...newAccountData, Password: e.target.value })} />
                    <label>Confirm Password <span>*</span></label>
                    <input type='password' required onChange={(e) => setNewAccountData({ ...newAccountData, CPassword: e.target.value })} />
                    <label>Choose Profile Picture</label>
                    <Filebase type='file' multiple={false} onDone={({ base64 }) => setNewAccountData({ ...newAccountData, ProfilePicture: base64 })} />
                    <div className='btn-container'>
                        <button onClick={HandleClick}>Register</button>
                    </div>
                </div>
            <div className='header-register-component-merge-effect-2'></div>
            </div>
            <div className={arePasswordsMatching ? 'passwords_not_matching' : 'passwords_not_matching passwords_not_matching_visible'} onMouseLeave={() => checkPassWordsMacthing(true)}>
                <h3 onClick={() => checkPassWordsMacthing(true)}>X</h3>
                <h1>
                    Your password and confirm password are not matching.
                    You need some coffee?
                </h1>
            </div>
        </>
    )
}

export default Register
