import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewPopUp } from '../../Actions';
import { updateSellerAccountData } from '../../Api';
import './AccountManagement.css'
import {useHistory} from 'react-router-dom'
import { LOGIN } from '../../Constants/Constants';

function AccountManagement() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sellerdata = useSelector(state => state.sellerdata[0])

    const [currentData, setCurrData] = useState({
        BusinessName: 'Loading...',
        BusinessType: 'Loading',
        ContactNumber: 'Loading',
        Email: 'Loading',
        Fullname: 'Loading',
        Password: 'Loading',
        StoreAddress: 'Loading',
        _id:''
    })

    useEffect(() => {
        setCurrData(sellerdata)
    },[sellerdata])
    const Update = async () => {
        const popUpData = {title:"Updated",body:"Your Profile has been updated successfully."};
        dispatch(setNewPopUp(popUpData))
        dispatch({type:LOGIN,payload:currentData})
        await updateSellerAccountData(currentData)
        history.push('/dashboard')
    }

    return (
        sellerdata===undefined?'Loading...':
        <div className='AccountManagement'>
            <h1>Manage Your Account <i className="fas fa-user-cog"></i></h1>
            <p className='manageAccountInfo'>
            <i className="fas fa-info-circle"></i> Simply tap on the field you want to update and then click button below to update your data.
            </p>
            <div className='SellerAccountData'>
                <div className='SellerAccountDataChild'>
                    <div className="SellerAccountDetailTitle">
                        Business Name
                    </div>
                    <input value={currentData.BusinessName} onChange={(e)=>setCurrData({...currentData,BusinessName:e.target.value})} />
                </div>
                <div className='SellerAccountDataChild'>
                    <div className="SellerAccountDetailTitle">
                        Business Type
                    </div>
                    <input value={currentData.BusinessType} onChange={(e)=>setCurrData({...currentData,BusinessType:e.target.value})} />
                </div>
                <div className='SellerAccountDataChild'>
                    <div className="SellerAccountDetailTitle">
                        Email
                    </div>
                    <input value={currentData.Email} onChange={(e)=>setCurrData({...currentData,Email:e.target.value})} />
                </div>
                <div className='SellerAccountDataChild'>
                    <div className="SellerAccountDetailTitle">
                        Phone
                    </div>
                    <input value={currentData.ContactNumber} onChange={(e)=>setCurrData({...currentData,ContactNumber:e.target.value})} />
                </div>
                <div className='SellerAccountDataChild'>
                    <div className="SellerAccountDetailTitle">
                        Password
                    </div>
                    <input type='password' value={currentData.Password} onChange={(e)=>setCurrData({...currentData,Password:e.target.value})} />
                </div>
                <div className='SellerAccountDataChild'>
                    <div className="SellerAccountDetailTitle">
                        Store Address
                    </div>
                    <input value={currentData.StoreAddress} onChange={(e)=>setCurrData({...currentData,StoreAddress:e.target.value})} />
                </div>
                <div className='btn_cont'>
                <button onClick={Update}>Update Profile</button>
                </div>
            </div>
        </div>
    )
}

export default AccountManagement
