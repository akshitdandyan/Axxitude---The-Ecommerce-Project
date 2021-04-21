import express from 'express';
import RegisteredUser from '../models/RegisterUser.js';
import SellerAccount from '../models/SellerAccount.js';
import SellerProduct from '../models/SellerProduct.js'

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
    const {Fullname,BusinessName,BusinessType,StoreAddress,Email,ContactNumber,Password,ProfilePicture} = req.body;
    const checkAlreadyRegistered = await SellerAccount.find({Email:Email})
    if(checkAlreadyRegistered.length){
        res.status(400).json(false)
        console.log("Email already registered")
        return
    }
    const newSellerAccount = new SellerAccount({Fullname,BusinessName,BusinessType,StoreAddress,Email,ContactNumber,Password,ProfilePicture})
    try {
        await newSellerAccount.save();
        res.status(201).json(true)
        console.log("SELLER ACCOUNT CREATED")
    } catch (error) {
        console.log("CANNOT CREATE SELLER ACCOUNT",error)
    }
}

export const getProductsFromSellers = async(req,res)=>{
    const sellerProducts = await SellerProduct.find();
    res.status(200).json(sellerProducts);
}

export const sellerLogin = async(req,res) => {
    const {userEmail} =  (req.query)
    const sellerData = await SellerAccount.find({Email:userEmail})
    res.status(200).json(sellerData) 
}

export const lauchSellerProduct = async(req,res) =>{
    const {SellerEmail,ProductName,ProductDescription,ProductPrice,ProductCategory,Tags,ProductImage} = req.body;
    // SellerProduct.countDocuments({SellerEmail:SellerEmail},function(err,count){
    //      ProductNumber = count
    // });
    // console.log(ProductNumber)
    const ProductNumber = 0;
    // get count value into product number
    const newSellerProduct = new SellerProduct({SellerEmail,ProductName,ProductDescription,ProductPrice,ProductCategory,Tags,ProductImage,ProductNumber})
    try {
        await newSellerProduct.save();
        res.status(201).json(true)
    } catch (error) {
        console.log(error)
    }
}

export const getLaunchedProducts = async(req,res) => {
    const {sellerEmail} =  (req.query)
    const launchedProducts = await SellerProduct.find({SellerEmail:sellerEmail})
    res.status(200).json(launchedProducts)
}

export default router; 