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
    ProductsClicked:{
        type:Number,
        default:0
    },
    TotalProducts:{
        type:Number,
        default:1
    },
    businessStartDate:{
        type:Date,
        default : new Date()
    }
})

var SellerAccount = mongoose.model('SellerAccount',sellerSchema);

export default SellerAccount;