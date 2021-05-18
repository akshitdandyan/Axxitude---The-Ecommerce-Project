import React, { useEffect, useState } from 'react'
import './ProductCard.css'
import { useDispatch } from 'react-redux';
import { delete_product } from '../../../../Actions'
import { advertiseProduct } from '../../../../Api';

const ProductCard = (props) => {
    const dispatch = useDispatch();
    const HandleClick = async() =>{
        const productID = props.props._id;
        dispatch(delete_product(productID))
    }
    const [isSponsered,setIsSponsored] = useState(false)
    useEffect(()=>{
        if(props.props.ad!==undefined){
            setIsSponsored(props.props.ad)
        }
    },[])

    const Advertise = async()=>{
        setIsSponsored(!isSponsered)
        advertiseProduct(props.props._id)
    }

    return (
        <div className = 'Product_card'>
            {!props.tobeSponsored?
                <div className='delete_product' onClick={HandleClick} title='Delete Product'><i className="fas fa-trash"></i></div>
                :
                <div className='Advertise_Product' 
                style={isSponsered?{color:'green'}:{color:'red'}} 
                onClick={Advertise} title='Advertise Product'><i class="fas fa-clipboard-check"></i></div>
}
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
