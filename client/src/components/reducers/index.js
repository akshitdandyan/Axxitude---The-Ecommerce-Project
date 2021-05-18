import { combineReducers } from 'redux';
import isLoggedReducer from './isLogged';
import sellerReducer from './userData';
import userData from './userData';
import showProductReducer from './showProductReducer';
import selectedProductReducer from './selectedProductReducer'
import cartReducer from './cartReducer';
import buyItemsReducer from './buyItemsReducer';
import pop_up_reducer from './POPUP_REDUCER';
import pop_up_visibility from './POPUP_REDUCER/pop_up_visibility';
import CategoryReducer from './CategoryString';
import sponsored_reducer from './sponsoredReducer';

export const reducers = combineReducers( {
    userData,
    isLoggedReducer,
    sellerReducer,
    showProductReducer,
    selectedProductReducer,
    cartReducer,
    buyItemsReducer,
    pop_up_visibility,
    pop_up_reducer,
    CategoryReducer,
    sponsored_reducer,
} );