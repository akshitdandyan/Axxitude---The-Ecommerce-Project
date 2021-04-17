import React from 'react';
import './sampleproductcard.css';
function SampleProductCard(props) {
    const fromAxxitude = props.fromAxxitude;
    const details = props.sampleProductDetails; 
    return (
        <div className="sampleproductcard">
            <div className="sampleproductimg">
                <img src={details.image || details.productImage} alt="Product Card" />
            </div>
            <div className="sampleproductdetail">
                <div className="sampleproducttitle">
                    {details.title || details.productName}
                </div>
                <div className="sampleproductprice">
                    {`$ ${details.price || details.productPrice}`} 
                </div>
                <div className="axxitudeverified">
                {fromAxxitude && <div className="axxv"><i className="fas fa-check-circle"></i><p className="fromAxxitude">From Axxitude</p></div>}
                </div>
                {/* <div className="sampleproductdescription">
                    <p>{details.description || details.productDescription}</p>
                </div> */}
            </div>
        </div>
    )
}
export default SampleProductCard;