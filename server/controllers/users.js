import express from 'express';
import RegisteredUser from '../models/RegisterUser.js';
import SellerAccount from '../models/SellerAccount.js';
import SellerProduct from '../models/SellerProduct.js';
import feedback from '../models/Feedback.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
//CLIENT
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
        res.status(400).json({ message: error.message });
    }
}

export const getUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await RegisteredUser.find({email:email,password:password});
        if(user.length>0){
        res.status(200).json(user) 
        console.log('userdatasent');
        }else{
            res.status(400).json({"message":"not found"})
        }
    }catch(error){
        console.log("CONTROLLERS",error)
    }
}

export const addToCart = async (req,res) => {
    const  cartData  = req.body;
    try {
        await RegisteredUser.findOneAndUpdate(
                {email:cartData.userEmail},
                {$push:{cart:cartData.product}}
            )
        console.log("Added to Cart");
    } catch (error) {
        console.log("WOOPS",error);
    }
}
export const removeFromCart = async (req, res) => {
    const { productID,userID } = req.body;
    const user = await RegisteredUser.findById(userID);
    const updatedCart = user.cart.filter((cartItem)=>cartItem._id != productID)
    await RegisteredUser.findByIdAndUpdate(userID,{cart:updatedCart},{new:true});
    res.status(200).json('cart updated')

}
export const buyItem = async(req,res) => {
    const {userID,product} = req.body;
    try {
        await RegisteredUser.findByIdAndUpdate(userID,{$push:{itemsToBeBought:product}},{new:true});
        const SellerEmail = product.SellerEmail;
        const seller = SellerAccount.find({Email:SellerEmail})
        console.log(seller);
        var soldProducts = 0;
        if(seller.ProductsSold !==undefined){
            soldProducts = seller.ProductsSold
        }
        const hm = await SellerAccount.findOneAndUpdate({Email:SellerEmail},{ProductsSold:soldProducts+1},{new:true})
        console.log("ITEM BOUGHT");
        res.status(200).json('success');
    } catch (error) {
        console.log(error);
    }
}
export const cancelOrder = async(req,res) =>{
    const { userID,product } = req.body;
    try {
        const user = await RegisteredUser.findById(userID);
        const updatedItemsToBeBought = user.cart.filter((Item)=>Item._id != product._id)
        await RegisteredUser.findByIdAndUpdate(userID,{itemsToBeBought:updatedItemsToBeBought},{new:true})

        res.status(200).json("success")
    } catch (error) {
        console.log(error);
    }
}
export const updateAddress = async(req,res) => {
    const {userID,new_address} = req.body;
    try {
        const updatedDetails = await RegisteredUser.findByIdAndUpdate(userID,{address:new_address},{new:true});
        res.status(200).json(updatedDetails)
    } catch (error) {
        console.log(error);
    }
}
export const postReview = async(req,res) => {
    const { productID,review } = req.body;
    console.log(review);
    try {
        await SellerProduct.findByIdAndUpdate(productID,{$push:{Reviews:review}},{new:true});
        console.log('Review Added');
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
    }
}

//SELLER
export const seller_Account = async(req,res)=>{
    const {Fullname,BusinessName,BusinessType,Gender,StoreAddress,Email,ContactNumber,Password,ProfilePicture} = req.body;
    const checkAlreadyRegistered = await SellerAccount.find({Email:Email})
    if(checkAlreadyRegistered.length){
        res.status(400).json(false)
        console.log("Email already registered")
        return
    }
    const newSellerAccount = new SellerAccount({Fullname,BusinessName,BusinessType,StoreAddress,Gender,Email,ContactNumber,Password,ProfilePicture})
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
    console.log(userEmail);
    const sellerData = await SellerAccount.find({Email:userEmail})
    res.status(200).json(sellerData) 
}

export const lauchSellerProduct = async(req,res) =>{
    const {SellerEmail,ProductName,ProductDescription,ProductPrice,ProductCategory,Tags,ProductImage} = req.body;
    const currSeller = await SellerAccount.find({Email:SellerEmail})
    const currSellerTotalProducts = currSeller[0].TotalProducts
    await SellerAccount.findOneAndUpdate({Email:SellerEmail}, { TotalProducts: currSellerTotalProducts+1}, { new: true });
    const newSellerProduct = new SellerProduct({SellerEmail,ProductName,ProductDescription,ProductPrice,ProductCategory,Tags,ProductImage})
    try {
        await newSellerProduct.save();
        res.status(201).json(true)
        console.log("LAUNCHED");
    } catch (error) {
        console.log(error)
    }
}

export const getLaunchedProducts = async(req,res) => {
    const {sellerEmail} =  (req.query)
    const launchedProducts = await SellerProduct.find({SellerEmail:sellerEmail})
    res.status(200).json(launchedProducts)
}

export const deleteLaunchedProduct = async(req,res) => {
    const { id,SellerEmail } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await SellerProduct.findByIdAndRemove(id);
    const currSeller = await SellerAccount.find({Email:SellerEmail})
    const currSellerTotalProducts = currSeller[0].TotalProducts
    await SellerAccount.findOneAndUpdate({Email:SellerEmail}, { TotalProducts: currSellerTotalProducts - 1}, { new: true });

    res.status(200).json({ message: "PRODUCT deleted successfully." });
}

export const incClickOnProduct = async(req,res) =>{
    const {SellerEmail} = req.body
    const currSeller = await SellerAccount.find({Email:SellerEmail})
    const currProductsClicked = currSeller[0].ProductsClicked
    await SellerAccount.findOneAndUpdate({Email:SellerEmail}, { ProductsClicked: currProductsClicked+1}, { new: true });
    console.log('CLICKED API');
    res.status(200).json(true);
}

export const sponserNewProduct = async(req,res) => {
    const { productID } = req.body;
    await SellerProduct.findByIdAndUpdate(productID,{ad:true},{new:true})
    res.status(200)
}
export const updateSellerData = async(req,res) => {
    const {Fullname,BusinessName,BusinessType,StoreAddress,Email,ContactNumber,Password,_id} = req.body.updatedDATA;
    try {
        await SellerAccount.findByIdAndUpdate(_id,{Fullname,BusinessName,BusinessType,StoreAddress,Email,ContactNumber,Password,_id},{new:true});
        res.status(201)
    } catch (error) {
        console.log(error);
    }
}
export const addBankDetail = async(req,res) => {
    const{_id,bank} = req.body;
    try {
        await SellerAccount.findOneAndUpdate(_id,{Bank:bank},{new:true})
        res.status(200)
    } catch (error) {
        console.log(error);
    }
}
// Feedbacks
export const newFeedback = async(req,res) => {
    const {name,email,message} = req.body;
    const newFeedBack =  feedback({ Name:name, Email:email, Message:message });
    try {
        await newFeedBack.save()
        res.status(200)
    } catch (error) {
        console.log(error);
    }
}

export default router; 