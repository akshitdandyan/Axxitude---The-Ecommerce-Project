import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import {getUserDataToLogin} from '../../Api'
import SellerDataContainer from './SellerDataContainer'
import {useHistory} from 'react-router-dom'
function Dashboard() {
    const History = useHistory()
    const [sellerInfo,setSellerInfo] = useState({Fullname:'',BusinessName:'',BusinessType:'',StoreAddress:'',Email:''})
    const seller_account_email = localStorage.getItem("seller_account_email");
    useEffect(() => {
        const getDetails = async() =>{
            const sellerData = await getUserDataToLogin(seller_account_email)
            if(sellerData.data.length===0){
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
                <h1>Hey {sellerInfo.Fullname }</h1>
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
