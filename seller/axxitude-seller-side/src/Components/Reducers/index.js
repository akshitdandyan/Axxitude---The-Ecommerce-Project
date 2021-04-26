import { combineReducers } from 'redux';

import sellerproducts_ from './SellerProducts';
import sellerdata from './SellerData'

export const reducers =  combineReducers({ sellerproducts_,sellerdata })