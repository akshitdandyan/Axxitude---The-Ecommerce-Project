import { combineReducers } from 'redux';
import isLoggedReducer from './isLogged';
import sellerReducer from './usersData';
import users from './usersData';

export const reducers = combineReducers( {
    users,
    isLoggedReducer,
    sellerReducer
} );