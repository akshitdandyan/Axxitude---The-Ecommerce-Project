import React, { useState } from 'react'
import FileBase from 'react-file-base64';
import {useDispatch} from'react-redux';
import './seller.css'
import {sellerAccount} from '../actions/actions.js'
import seller_side_1 from '../../media/Videos/Seller_Side_1.mp4';
export default function Seller() {
    const [sellerData,setSellerData] = useState({businessName:'',businessType:'',email:'',password:'',cpassword:'',address:'',productName:'',productPrice:'',productDescription:'',productImage:''})
    const dispatch = useDispatch();
    const onSubmit =(e)=>{
        e.preventDefault()
        if(sellerData.password!==sellerData.cpassword){
            alert("PASSWORDS ARE NOT MATCHING")
            return;
        }
        dispatch(sellerAccount(sellerData))

    }
    const [videoComp,setVideoComp] = useState(false);
    useState(()=>{
        setTimeout(() => {
            setVideoComp(true)
        }, 44000);
    },[])
    return (
        <div className="seller">
            <div className={videoComp?'seller_side_vdo_container seller_side_vdo_hide':'seller_side_vdo_container'}>
                <video autoPlay>
                    <source src={seller_side_1} type="video/mp4"/>
                </video>
            </div>
            <div className="seller_registration_form">
                <form autoComplete="true">
                    <div className="seller_input_field">
                        <label>Business Name</label>
                        <input type="text" name="businessName" onChange={(e)=>setSellerData({...sellerData,businessName:e.target.value})} required></input>
                    </div>
                    <div className="seller_input_field">
                        <label>Business Type</label>
                        <input type="text" name="businessName" onChange={(e)=>setSellerData({...sellerData,businessType:e.target.value})} required></input>
                    </div>
                    <div className="seller_input_field">
                        <label>Email</label>
                        <input type="email" name="businessName" onChange={(e)=>setSellerData({...sellerData,email:e.target.value})} required></input>
                    </div>
                    <div className="seller_input_field">
                        <label>Choose Password</label>
                        <input type="password" name="businessName" onChange={(e)=>setSellerData({...sellerData,password:e.target.value})} required></input>
                    </div>
                    <div className="seller_input_field">
                        <label>Confirm Password</label>
                        <input type="password" name="businessName" onChange={(e)=>setSellerData({...sellerData,cpassword:e.target.value})} required></input>
                    </div>
                    <div className="seller_input_field">
                        <label>Address</label>
                        <input type="text" name="businessName" onChange={(e)=>setSellerData({...sellerData,address:e.target.value})} required></input>
                    </div>
                    <div className="seller_input_field">
                        <label>Product Name</label>
                        <input type="text" name="businessName" onChange={(e)=>setSellerData({...sellerData,productName:e.target.value})} required></input>
                    </div>
                    <div className="seller_input_field">
                        <label>Product Pricing (in $)</label>
                        <input type="number" name="businessName" onChange={(e)=>setSellerData({...sellerData,productPrice:e.target.value})} required></input>
                    </div>
                    <div className="seller_input_field">
                        <label>Product Description</label>
                        <input type="text" name="businessName" onChange={(e)=>setSellerData({...sellerData,productDescription:e.target.value})} required></input>
                    </div>
                    <div className="seller_input_field seller_file_input">
                        <label>Product Image</label>
                        <FileBase type="file" multiple={false} onDone={({base64})=>setSellerData({...sellerData,productImage:base64})} required className="seller_file_input"/>
                    </div>
                    <button type="submit" onClick={onSubmit}>Start Selling</button>
                </form>
            </div>
        </div>
    )
}
