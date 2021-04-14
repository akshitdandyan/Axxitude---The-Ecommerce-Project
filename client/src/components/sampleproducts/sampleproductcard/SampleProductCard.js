import React from 'react';
import './sampleproductcard.css';
function SampleProductCard(props) {
    const details = props.sampleProductDetails; 
    return (
        <div className="sampleproductcard">
            <div className="sampleproductimg">
                <img src={details.image || details.productImage} alt="Product Card" />
            </div><br />
            <div className="sampleproductdetail">
                <div className="sampleproductprice">
                    <h3>{`$ ${details.price || details.productPrice}`}</h3>
                </div><br />
                <div className="sampleproducttitle">
                    <h4>{details.title || details.productName}</h4>
                </div><br />
                <div className="sampleproductdescription">
                    <p>{details.description || details.productDescription}</p>
                </div>
            </div>
        </div>
    )
}
export default SampleProductCard;