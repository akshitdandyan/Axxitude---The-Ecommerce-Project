import EachCartItem from './EachCartItem';

function CartContent(props) {
    const cartItems = props.props;
    const userID = props.userID;
    return (
        <div>
            <div className='cart_items_container'>
                {cartItems.map((item)=><EachCartItem props={item} id={userID} key={item.id===undefined?item._id:item.id} />)}
            </div>            
        </div>
    )
}

export default CartContent
