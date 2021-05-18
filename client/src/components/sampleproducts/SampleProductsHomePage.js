import React,{ useState,useEffect } from 'react';
import Categories from '../categories/Categories';
import SampleProducts from './SampleProducts';
import CartIcon from './../CartIcon/CartIcon';
import {Helmet} from 'react-helmet';
import popupsound from './../../media/sounds/popup.mp3';
import ShowProduct from './../showProduct/ShowProduct';
import { useSelector } from 'react-redux';
import Trending from './Trendings/Trendings'

function SampleProductsHomePage() {
    const styles={
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
    };
    const [sellerPromotional,setSellerPromotional] = useState(false);
    const isShowProduct = useSelector((state)=> state.showProductReducer)
    const popup = new Audio(popupsound);
    const isLogged = useSelector(state => state.isLoggedReducer)

    useEffect(()=>{
    },[isShowProduct])

    useEffect(()=>{
        const   showPromotionalPopUp = ()=>{
            setTimeout(() => {
                setSellerPromotional(true)
                popup.play()
            }, 7000);
        }
        if(isLogged){
            showPromotionalPopUp()
        }
    },[isLogged])
    
    return (
        <>
        <Helmet><title>Axxitude | Think Buy Grow</title></Helmet>
            <ShowProduct />
            <div style={styles}>
                    <Categories />

            </div>
            <div className="sampleproducts">
                <SampleProducts />
            </div>
            <div className={sellerPromotional ? 'seller_promotional_pop_up':"seller_promotional_pop_up seller_promotional_pop_up_close"}>
                <p>
                    Don't forget to visit our <a href='http://localhost:3001' target="_axxitude">Seller Side</a>.
                    You can miss a cool opportunity of making money
                    with Axxitude.
                </p>
                <div className='close_pop_up' onClick={()=>setSellerPromotional(false)}><i className="fas fa-thumbs-up"></i></div>
            </div>
            <CartIcon />
            <Trending />
        </>
    )
}
export default SampleProductsHomePage;