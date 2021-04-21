import mongoose from 'mongoose';

const sellerSchema = mongoose.Schema({
    Fullname:String,
    BusinessName : String,
    BusinessType : String,
    StoreAddress : String,
    Email : String,
    ContactNumber : Number,
    Password : String,
    ProfilePicture: String,
    businessStartDate:{
        type:Date,
        default : new Date()
    }
})

var SellerAccount = mongoose.model('SellerAccount',sellerSchema);

export default SellerAccount;