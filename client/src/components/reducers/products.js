const products = (state=[],action) => {
    switch (action.type) {
        case 'FETCHPRODUCTS':
            return state = action.payload
        default:
            return state;
    }
}

export default products;