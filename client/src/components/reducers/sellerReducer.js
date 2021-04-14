import {SELLER} from '../constants/actionTypes.js';
const sellerReducer = (sellers={},action)=>{
    switch(action.type){
        case SELLER:
            return [...sellers,action.payload]
        default:
            return action.payload;
    }
}
export default sellerReducer;