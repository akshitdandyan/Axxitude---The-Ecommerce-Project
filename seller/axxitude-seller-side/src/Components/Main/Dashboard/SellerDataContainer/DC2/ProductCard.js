import React, { useEffect } from 'react'
import './ProductCard.css'
import { useDispatch } from 'react-redux';
import { delete_product } from '../../../../Actions'

const ProductCard = (props) => {
    const dispatch = useDispatch();
    const HandleClick = async() =>{
        const productID = props.props._id;
        dispatch(delete_product(productID))
    }

    return (
        <div className = 'Product_card'>
            <div className='delete_product' onClick={HandleClick} title='Delete Product'><i className="fas fa-trash"></i></div>
            <div className='Product_card_image'>
                <img src={props.props.ProductImage} alt="Product" />
            </div>
            <div className='Product_Details'>
                <div className='Product_Name'>
                    {props.props.ProductName}
                </div>
                <div className='Product_Price'>
                    $ {props.props.ProductPrice}
                </div>
                <div className='Product_Category'>
                    {props.props.ProductCategory}
                </div>
                <div className='Product_Tags'>
                    {props.props.Tags}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
