import mongoose from 'mongoose';

const sellerSchema = mongoose.Schema({
    businessName:String,
    businessType:String,
    email:String,
    password:String,
    cpassword:String,
    address:String,
    productName:String,
    productPrice:Number,
    productDescription:String,
    productImage:String,
    businessStartDate:{
        type:Date,
        default : new Date()
    }
})

var SellerAccount = mongoose.model('seller_account',sellerSchema);

export default SellerAccount;