import Mongoose from 'mongoose';

const SellerProductSchema = Mongoose.Schema({
    SellerEmail: String,
    ProductName: String,
    ProductDescription: String,
    ProductPrice: String,
    ProductCategory: String,
    Tags: String,
    ProductImage: String,
    ProductNumber: Number,
    LaunchedTime:{
        type:Date,
        default: new Date().toUTCString()
    }
})

var SellerProduct = Mongoose.model('sellerproduct',SellerProductSchema)

export default SellerProduct