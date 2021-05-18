import { SELECT_PRODUCT,UNSELECT_PRODUCT } from '../constants/actionTypes';

const selectedProductReducer = (selectedProduct={},action) =>{
    switch (action.type) {
        case SELECT_PRODUCT:
            return selectedProduct = action.payload;
        case UNSELECT_PRODUCT:
            return selectedProduct = {};
        default:
            return selectedProduct;
    }
}

export default selectedProductReducer;