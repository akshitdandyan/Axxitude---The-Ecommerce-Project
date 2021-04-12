import React, { useState, useEffect } from 'react';
import SampleProductCard from './sampleproductcard/SampleProductCard';
import './sampleproducts.css';
function SampleProducts() {
    const [products, setProducts] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then((json)=>{
                setProducts(json);
                setProductsLoaded(true);
            })
        .catch(err => {
            console.error(err);
        });
    },[])
    return (
        !productsLoaded?
        <div className="loading"></div>
        :
        <div className="allsampleproducts">
        {products.map(products => (
          <SampleProductCard sampleProductDetails={products} key={products.id}/>
        ))}
    
        </div>
    )
}
export default SampleProducts