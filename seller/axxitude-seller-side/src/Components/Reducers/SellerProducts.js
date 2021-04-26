import {  ADDPRODUCTS, DELETEPRODUCT,CLEARPRODUCTS,LAUNCHPRODUCT } from '../Constants/Constants.js'

const sellerproducts_ = (SellerProducts=[],action)=>{
    switch(action.type){
        case ADDPRODUCTS:
            return SellerProducts = action.payload
        case LAUNCHPRODUCT:
            return [...SellerProducts,action.payload]
        case DELETEPRODUCT:
            return SellerProducts.filter((SellerProduct)=> SellerProduct._id !== action.payload);
        case CLEARPRODUCTS:
            return SellerProducts = []
        default :
            return SellerProducts;
    }
}

export default sellerproducts_;