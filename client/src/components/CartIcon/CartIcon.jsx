import './CartIcon.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AllCartProducts from './AllCartProducts';
import { update_Address } from '../actions/actions';
import { useDispatch } from 'react-redux';
import EachOrderedItem from './EachOrderedItem';
import Draggable from 'react-draggable';

const CartIcon = () => {
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector(state => state.cartReducer)
    const userData = useSelector(state => state.userData)
    const [inputActivated, setInputActivated] = useState(false)
    const [address, setAddress] = useState('');
    const isLogged = useSelector(state => state.isLoggedReducer)
    const orderedItems = useSelector(state => state.buyItemsReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        setAddress(userData.address)
    }, [cartItems,userData.address])
    const DoUpdateAddress = () => {
        dispatch(update_Address(userData._id, address))
        setInputActivated(false)
    }
    const TotalProductInCart = cartItems !== undefined ? cartItems.length : 0;
    const vw = window.innerWidth;
    return (
        <>
            {vw > 1200 ?
                <Draggable>
                    <div className={!showCart ? 'cart_icon' : 'cart_icon_hide'} onClick={() => setShowCart(true)}>
                        <div className='total_product_on_cart_icon'>{TotalProductInCart}</div>
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                </Draggable> :
                <div className={!showCart ? 'cart_icon' : 'cart_icon_hide'} onClick={() => setShowCart(true)}>
                    <div className='total_product_on_cart_icon'>{TotalProductInCart}</div>
                    <i className="fas fa-shopping-cart"></i>
                </div>
            }

            <div className={showCart ? 'cart cart_show' : 'cart'}>
                <i className="far fa-window-close" onClick={() => setShowCart(false)}></i>
                <div className='cart_content'>
                    <h3>Your Cart</h3>

                    {isLogged && <div className='user_address'>Delivey Address : <br />
                        {!inputActivated ? <div className="address">{address}</div> :
                            <input className='edit_address' value={address} onChange={(e) => setAddress(e.target.value)} />}
                        {!inputActivated ?
                            <button onClick={() => setInputActivated(true)}>Change</button> :
                            <button onClick={() => DoUpdateAddress()}>Update</button>
                        }
                    </div>}
                    {!cartItems.length ? <div className='zero_proucts'>
                        When you will add products to cart, they will appear here.
                   <div className='empty_cart_img'></div>
                    </div>
                        :
                        <AllCartProducts props={cartItems} userID={userData._id} />
                    }
                    <div className='ordered_items'>
                        <h3 style={{ color: "Green", textAlign: "center", fontFamily: "Sarala", fontStyle: "italic", borderRadius: "50%", borderBottom: "5px solid green", boxShadow: '0px 10px 15px 0px rgb(12, 248, 99)' }}>
                            Placed Orders
                        </h3>
                        {orderedItems.length === 0 && <div className='zero_orders'>You haven't placed any orders yet</div>}
                        {orderedItems.map((item) => <EachOrderedItem props={item} userID={userData._id} key={item.id === undefined ? item._id : item.id} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartIcon