import express from 'express';
import RegisteredUser from '../models/RegisterUser.js';
import sellerAccount from '../models/SellerAccount.js';

const router = express.Router();

export const registerUser = async (req, res) => {
    const { firstname,lastname,email,address,occupation,phone,password,cpassword,image} = req.body;
    const shouldReturn = await RegisteredUser.find({email:email})
    if(shouldReturn.length){
        console.log("Should have returned")
        res.status(400).json(false)
        return;
    }
    const newPostMessage = new RegisteredUser({ firstname,lastname,email,address,occupation,phone,password,cpassword,image })
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
        console.log("REGISTRED")
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUser = async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await RegisteredUser.find({email:email});
        res.status(200).json(user)
    }catch(error){
        console.log("CONTROLLERS",error)
    }
}

export const seller_Account = async(req,res)=>{
    const {businessName,businessType,email,password,cpassword,address,productName,productPrice,productDescription,productImage} = req.body;
    const newSellerAccount = new sellerAccount({businessName,businessType,email,password,cpassword,address,productName,productPrice,productDescription,productImage})
    try {
        await newSellerAccount.save();
        res.status(201).json(newSellerAccount)
        console.log("SELLER ACCOUNT CREATED")
    } catch (error) {
        console.log("CANNOT CREATE SELLER ACCOUNT",error)
    }
}

export const getProductsFromSellers = async(req,res)=>{
    const sellerProducts = await sellerAccount.find();
    res.status(200).json(sellerProducts);
}

export default router;