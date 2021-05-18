import { ADD_TO_CART,REMOVE_FROM_CART,FETCH_CART_ITEMS,EMPTY_CART } from '../constants/actionTypes.js'

const cartReducer = (cartItems=[],action)=>{
    switch (action.type) {
        case FETCH_CART_ITEMS:
            return cartItems=action.payload;
        case ADD_TO_CART:
            return [...cartItems,action.payload]
        case REMOVE_FROM_CART:
            return cartItems.filter((cartItem) => cartItem._id !== action.payload);
        case EMPTY_CART:
            return cartItems = []
        default:
            return cartItems;
    }
}

export default cartReducer;