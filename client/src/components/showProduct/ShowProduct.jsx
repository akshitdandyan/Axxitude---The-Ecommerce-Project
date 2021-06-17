import './ShowProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { HIDE_PRODUCT } from '../constants/actionTypes';
import { AddToCart, BuyItem, setNewPopUp } from '../actions/actions.js';
import Reviews from './Reviews';
import {Helmet} from 'react-helmet'

const ShowProduct = () => {
    const dispatch = useDispatch()
    const isLogged = useSelector(state=>state.isLoggedReducer)
    const isLoaded = useSelector(state => state.showProductReducer)
    const [productDetails, setProductDetails] = useState([]);
    const productData = useSelector((state) => state.selectedProductReducer)
    const userData  = useSelector(state=>state.userData);
    const isPreview = useSelector(state=>state.showProductReducer)
    const userID = userData._id;
    useEffect(() => {
        setProductDetails(productData);
    }, [productData,isLoaded])

    const close_show_product = () => {
        dispatch({ type: HIDE_PRODUCT });
    }

    const addToCart = () =>{
        if (!isLogged){
            const popUpData = {title:"Access Denied",body:"You need to Log in first in order to add items to your cart"};
            dispatch(setNewPopUp(popUpData))
        }else{
            dispatch(AddToCart(productDetails))
            const popUpData = {title:"Added To Cart",body:productDetails.ProductName.slice(0,10)+"... has been added to your cart."};
            dispatch(setNewPopUp(popUpData))
        }
    }
    // rsz start
    
    let
        doc = document,
        ht = 500,
        main = document.querySelector(".show_product_bg"),
        y, dy;

    let startResize = function (evt) {
        if(y>=794){
            console.log('No more expand allowed 1');
            return;
        }
        y = evt.screenY;
    };

    let resize = function (evt) {
        console.log(y);
        if(y>=794){
            console.log('No more expand allowed 2');
            return;
        }

        dy = evt.screenY - y;
        y = evt.screenY;
        ht += dy;
        main.style.height = ht + "px";
    };

    function resize_func(evt) {
        startResize(evt);
        doc.body.addEventListener("mousemove", resize);
        doc.body.addEventListener("mouseup", function () {
            doc.body.removeEventListener("mousemove", resize);
        });
    };
    //rsz end
    return (
        <div className='show_product_bg' style={isLoaded ? { top: "0px" } : { top: "-700px" }}>
            <Helmet><title>{isPreview && productDetails.ProductName}</title></Helmet>
            <div className='show_product_content'>
                <div className='show_product_content_upper'>
                    <div className='show_product_image'>
                        <img src={productDetails.image || productDetails.ProductImage} alt='productDisplay' />
                    </div>
                    <div className='show_product_name'><div>{productDetails.title || productDetails.ProductName}</div></div>
                </div>
                <div className='show_product_content_lower'>
                    <div className='show_product_price'>$ {productDetails.price || productDetails.ProductPrice}</div>
                    <div className='show_product_description'>{productDetails.description || productDetails.ProductDescription}</div>
                    <div className='show_product_category'>Category : {productDetails.category || productDetails.ProductCategory}</div>
                    <div className='show_product_tags'>{productDetails.Tags ? ` Tags : ${productDetails.Tags}` : ''}</div>
                </div>
                <div className='show_product_functional'>
                    <div className="show_product_addToCart" onClick={addToCart}>Add To Cart</div>
                    <div className="show_product_buy" onClick={()=>{
                        if (!isLogged){
                            const popUpData = {title:"Access Denied",body:"You need to Log in first in order to purchase an item"};
                            dispatch(setNewPopUp(popUpData))
                        }else{
                            dispatch(BuyItem(userID,productDetails));
                            const popUpData = {title:"Order Placed",body:"Your order for "+productDetails.ProductName.slice(0,10)+"... has been placed."};
                            dispatch(setNewPopUp(popUpData))
                        }
                    }}>Buy Now</div>
                </div>
                <Reviews productDetails={productDetails} userData={userData} />
            </div>
            <div className='scroll_up_show_product' onClick={close_show_product} onMouseDown={resize_func}>
                <i className="fas fa-angle-double-up"></i>
            </div>
        </div>
    )
}

export default ShowProduct;