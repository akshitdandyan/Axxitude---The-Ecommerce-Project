import { useDispatch } from 'react-redux';
import { CancelOrder } from '../actions/actions';

function EachOrderedItem(props) {
    const dispatch = useDispatch();
    const productDetails = props.props;
    const userID = props.userID;
    return (
        <div className="EachOrderedItem">
            <div className='buy_img'>
                <img alt='orderedItem' src={productDetails.image || productDetails.ProductImage} />
            </div>
            <div className='buy_details'>
                <p style={{fontSize:"12px"}}>{productDetails.ProductName || productDetails.title}</p>
                <p style={{fontSize:"12px"}}>${productDetails.ProductPrice || productDetails.price}</p>
                <p style={{fontFamily:"Sarala",fontSize:"12px",marginTop:'7px'}}>Delivery expected by August 90, 3002</p>
                <button className='cancel_ordered_item' onClick={()=>dispatch(CancelOrder(userID,productDetails))}>Cancel Order</button>
            </div>
        </div>
    )
}

export default EachOrderedItem
