import React, { useState } from 'react'
import FileBase from 'react-file-base64';
import {useDispatch} from'react-redux';
import './seller.css'
import {sellerAccount} from '../actions/actions.js'

export default function Seller() {
    const [sellerData,setSellerData] = useState({businessName:'',businessType:'',email:'',password:'',cpassword:'',address:'',productName:'',productPrice:'',productDescription:'',productImage:''})
    const dispatch = useDispatch();
    const onSubmit =()=>{
        if(sellerData.password!==sellerData.cpassword){
            alert("PASSWORDS ARE NOT MATCHING")
            return;
        }
        dispatch(sellerAccount(sellerData))

    }
    return (
        <div className="seller">
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
                    <div className="seller_input_field">
                        <label>Product Image</label>
                        <FileBase type="file" multiple={false} onDone={({base64})=>setSellerData({...sellerData,productImage:base64})} required />
                    </div>
                    <button type="submit" onClick={onSubmit}>Start Selling</button>
                </form>
                <div className="seller_gif">
                    <iframe src="https://giphy.com/embed/iL94l9s7YOqxqxm03f" />
                </div>
            </div>
        </div>
    )
}
