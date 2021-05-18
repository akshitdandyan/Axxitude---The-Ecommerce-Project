import React from 'react';
import { increaseClick } from '../../api';
import './sampleproductcard.css';
import { useDispatch } from 'react-redux';
// import { Show_Product_Action } from '../../actions/actions';

function SampleProductCard(props) {
    const details = props.sampleProductDetails; 
    const dispatch = useDispatch();
    const HandleClick = () =>{
        // dispatch(Show_Product_Action)
        dispatch({type:'SHOW_PRODUCT'})
        dispatch({type:'SELECT_PRODUCT',payload:details})
        if(details.SellerEmail){
            increaseClick(details.SellerEmail)
        }
    }
    return (
        <div className="sampleproductcard" onClick={HandleClick}>
            <div className="sampleproductimg">
                <img src={details.image || details.ProductImage} alt="Product Card" />
            </div>
            <div className="sampleproductdetail">
                <div className="sampleproducttitle">
                    {details.title || details.ProductName}
                    <div className='control_title_overflow'></div>
                </div>
                <div className="sampleproductprice">
                    {`$ ${details.price || details.ProductPrice}`} 
                </div>
                <div className="axxitudeverified">
                {details.SellerEmail==="info@eraaxit.ml" && <div className="axxv"><i className="fas fa-check-circle"></i><p className="fromAxxitude">From Axxitude</p></div>}
                </div>
            </div>
            
        </div>
    )
}
export default SampleProductCard;