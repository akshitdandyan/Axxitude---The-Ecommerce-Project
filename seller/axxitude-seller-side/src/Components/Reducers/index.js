import { combineReducers } from 'redux';

import sellerproducts_ from './SellerProducts';
import sellerdata from './SellerData';
import isLoggedIn from './isLoggedIn';
import pop_up_reducer from './POPUP_REDUCER';
import pop_up_visibility from './POPUP_REDUCER/pop_up_visibility';

export const reducers =  combineReducers({ 
    sellerproducts_,
    sellerdata,
    isLoggedIn ,
    pop_up_reducer,
    pop_up_visibility
})