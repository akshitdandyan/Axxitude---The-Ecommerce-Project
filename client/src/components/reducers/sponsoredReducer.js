const sponsored_reducer = (sponsoredItems=[],action)=>{
    switch (action.type) {
        case 'FETCH_ADS':
            return sponsoredItems=action.payload
        default:
            return sponsoredItems;
    }
}
export default sponsored_reducer