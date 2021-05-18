import { useDispatch } from "react-redux";
import { removeFromCart,BuyItem } from "../actions/actions";

function EachCartItem(props) {
    const Item_Details = props.props;
    const userID = props.id;
    const dispatch = useDispatch();
    return (
        <div className="EachCartItem">
            <div className="cartItemImg">
                <img alt='noob' src={Item_Details.ProductImage || Item_Details.image} />
            </div>
            <div className="cartItemDetail">
                <div className="cartItemName">{Item_Details.ProductName || Item_Details.title}<div className='cart_item_hide_overflow' ></div></div>
                <p className="cartItemPrice">$ {Item_Details.ProductPrice || Item_Details.price}</p>
            </div>
            <div className="cartItemModifiers">
                <div className="cartItemBuy" onClick={()=>{
                    dispatch(BuyItem(userID,Item_Details));
                    dispatch(removeFromCart(Item_Details._id,userID))
                    }}>Buy</div>
                <div className="cartItemBye" onClick={()=>dispatch(removeFromCart(Item_Details._id,userID))}>Remove</div>
            </div>
        </div>
    )
}

export default EachCartItem
