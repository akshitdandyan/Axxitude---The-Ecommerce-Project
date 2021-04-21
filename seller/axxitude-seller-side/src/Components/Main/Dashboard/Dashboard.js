import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import {getUserDataToLogin} from '../../Api'
import SellerDataContainer from './SellerDataContainer'
function Dashboard() {
    const [sellerInfo,setSellerInfo] = useState({Fullname:'',BusinessName:'',BusinessType:'',StoreAddress:'',Email:''})
    const seller_account_email = localStorage.getItem("seller_account_email");
    useEffect(() => {
        const getDetails = async() =>{
            const sellerData = await getUserDataToLogin(seller_account_email)
            setSellerInfo(sellerData.data[0])
        }
        getDetails()
    }, [seller_account_email])
    return (
        <div className='dashboard'>
            <div className='dashboard_navbar'>
                <h1>Hey {sellerInfo.Fullname}</h1>
                <div className='dashboard_navbar_items_container'>
                    <div className='dashboard_navbar_item'><span>Account Management </span></div>
                    <div className='dashboard_navbar_item'><span>Advertising        </span></div>
                    <div className='dashboard_navbar_item'><span>More Services      </span></div>
                    <div className='dashboard_navbar_item'><span>Your Profile       </span></div>
                </div>
            </div>
            <SellerDataContainer />
            
        </div>
    )
}

export default Dashboard
