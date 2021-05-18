import { BUY_ITEM,CANCEL_ITEM,FETCH_ORDERED_ITEMS,EMPTY_BUY_ITEMS } from '../constants/actionTypes';

const buyItemsReducer = (buyItems =[],action) => {
    switch (action.type) {
        case FETCH_ORDERED_ITEMS:
            return buyItems = action.payload
        case BUY_ITEM:
            return [...buyItems,action.payload]
        case CANCEL_ITEM:
            return buyItems.filter((buyItem)=>buyItem._id !== action.payload)
        case EMPTY_BUY_ITEMS:
            return buyItems = []
        default:
            return buyItems;
    }
}

export default buyItemsReducer;