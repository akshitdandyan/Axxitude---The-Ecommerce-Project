import { ADDTOADVERTISEMENT,DELETEFROMADVERTISEMENT, FETCHADS } from '../Constants/Constants.js';

const ads = (advertisement=[],action) => {
    switch (action.type) {
        case FETCHADS:
            return advertisement=action.payload
        case ADDTOADVERTISEMENT:
            return [...advertisement,action.payload];
        case DELETEFROMADVERTISEMENT:
            return advertisement.filter(ad=>ad._id!==action.payload)
        default:
            return advertisement;
    }
}

export default ads;