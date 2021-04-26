import { LOGIN,LOGOUT } from '../Constants/Constants.js';

const sellerdata = (SellerData=[],action)=>{
    switch(action.type){
        case LOGIN:
            return SellerData = action.payload
        case LOGOUT:
            return SellerData = []
        default :
            return SellerData ;
    }
}

export default sellerdata;