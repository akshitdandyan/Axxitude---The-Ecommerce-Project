import React, { useState } from 'react'
import './Register.css'
import { RegisterForSellerAccount } from './../Api'
import { useHistory } from 'react-router-dom'
import Filebase from 'react-file-base64'

function Register() {
    const history = useHistory()
    const [arePasswordsMatching, checkPassWordsMacthing] = useState(true)
    const [newAccountData, setNewAccountData] = useState({
        Fullname:'',
        BusinessName: '',
        BusinessType: '',
        StoreAddress: '',
        Email: '',
        ContactNumber: '',
        Password: '',
        CPassword: '',
        ProfilePicture: ''
    })
    const HandleClick = async () => {
        if (newAccountData.Password !== newAccountData.CPassword) {
            checkPassWordsMacthing(false)
            return;
        }
        try {
            const isRegistered = await RegisterForSellerAccount(newAccountData)
            if (isRegistered) {
                console.log("Setting email in localstorage")
                localStorage.setItem("seller_account_email", newAccountData.Email);
                history.push('/dashboard')
                //make seller login with reducers

            } else {
                alert("An account with this email id already exists")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className={arePasswordsMatching ? 'register_seller_account' : 'register_seller_account blurform'}>
                <div className='header-register-component-merge-effect-1'></div>
                <div className='registration_form_container axx-form'>
                    <label>Full Name <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, Fullname: e.target.value })} />
                    <label>Choose Business Name <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, BusinessName: e.target.value })} />
                    <label>Choose Business Type <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, BusinessType: e.target.value })} />
                    <label>Your Store Address <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, StoreAddress: e.target.value })} />
                    <label>Your Email <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewAccountData({ ...newAccountData, Email: e.target.value })} />
                    <label>Phone Number</label>
                    <input type='number' required onChange={(e) => setNewAccountData({ ...newAccountData, ContactNumber: e.target.value })} />
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
