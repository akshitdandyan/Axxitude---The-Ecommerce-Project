import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import {getUserDataToLogin} from '../../Api'
import Profile from '../../Profile/Profile'
import SellerDataContainer from './SellerDataContainer'
import {Link, useHistory,Route, Switch} from 'react-router-dom'
import { setNewPopUp } from '../../Actions'
import { useDispatch } from 'react-redux'
import { LOGOUT, LOGOUTAUTH } from '../../Constants/Constants'

function Dashboard() {
    const History = useHistory()
    const dispatch = useDispatch()
    const [sellerInfo,setSellerInfo] = useState({Fullname:'',BusinessName:'',BusinessType:'',StoreAddress:'',Email:''})
    const seller_account_email = localStorage.getItem("seller_account_email");
    useEffect(() => {
        const getDetails = async() =>{
            const sellerData = await getUserDataToLogin(seller_account_email)
            if(sellerData.length===0){
                dispatch({type:LOGOUTAUTH})
                dispatch({type:LOGOUT})
                localStorage.setItem("seller_account_email",'null');
                return
            }
            if(sellerData.data.length===0){
                const popUpData = {title:"Error",body:"Cannot Login you right now, Clear Cache and then try Logging in again."};
                dispatch(setNewPopUp(popUpData))
                dispatch({type:LOGOUTAUTH})
                dispatch({type:LOGOUT})
                localStorage.setItem("seller_account_email",'null');
                History.push('/')
                return
            }
            setSellerInfo(sellerData.data[0])
        }
        getDetails()
    }, [seller_account_email,History])
    return (
        <div className='dashboard'>
            <div className='dashboard_navbar'>
                <h1> {sellerInfo.BusinessName } <p>powered by Axxitude</p></h1>
                <div className='dashboard_navbar_items_container'>
                    <Link to='/account-management'  className='dashboard_navbar_item'><div ><span>Account Management</span></div></Link>
                    <Link to='/advertising'  className='dashboard_navbar_item'><div ><span>Advertising</span></div></Link>
                    <Link to='/analytics'  className='dashboard_navbar_item'><div ><span>Analytics</span></div></Link>
                    <Link to='/profile' className='dashboard_navbar_item'><div><span>Your Profile </span></div></Link>
                </div>
            </div>
            <Switch>
                <Route path="/profile" exact component={Profile} />
                <Route path="/dashboard" exact component={SellerDataContainer} />
            </Switch>
           
            
        </div>
    )
}

export default Dashboard
