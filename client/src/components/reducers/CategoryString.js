

const CategoryReducer = (category='',action) => {
    switch (action.type) {
        case 'CHANGECATEGORY':
            return category = action.payload
        case 'CLEARCATEGORY':
            return category = ''
        default:
            return category;
    }
}

export default CategoryReducer