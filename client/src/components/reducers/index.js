import { combineReducers } from 'redux';
import isLoggedReducer from './isLogged';
import users from './usersData';

export const reducers = combineReducers( {
    users,
    isLoggedReducer
} );