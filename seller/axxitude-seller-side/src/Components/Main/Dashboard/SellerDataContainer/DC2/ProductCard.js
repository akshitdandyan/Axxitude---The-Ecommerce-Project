import React from 'react'
import './ProductCard.css'
const ProductCard = (props) => {
    return (
        <div className = 'Product_card'>
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
