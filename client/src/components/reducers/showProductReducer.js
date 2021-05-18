import { SHOW_PRODUCT,HIDE_PRODUCT } from '../constants/actionTypes.js';

const showProductReducer = (productPopUp=(false),action) =>{
    switch (action.type) {
        case SHOW_PRODUCT:
            return productPopUp = true
        case HIDE_PRODUCT:
            return productPopUp = false
        default:
            return productPopUp
    }
}

export default showProductReducer;