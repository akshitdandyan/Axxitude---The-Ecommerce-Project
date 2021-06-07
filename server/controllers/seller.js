import SellerAccount from '../models/SellerAccount.js';
import SellerProduct from '../models/SellerProduct.js';
import mongoose from 'mongoose'

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
