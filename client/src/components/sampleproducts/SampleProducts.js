import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import SampleProductCard from './sampleproductcard/SampleProductCard';
import {getProductsFromSellers} from '../api'
import './sampleproducts.css';
import LoadingSellersProduct from './LoadingSellersProduct';

function SampleProducts() {
    const dispatch = useDispatch();
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

    const [productsFromSeller,setProductsFromSeller]=useState([]);
    const [productsFromSellerLoaded,setProductsFromSellerLoaded] = useState(false);
    useEffect(async()=>{
        const sellersData = await dispatch(getProductsFromSellers);
        setProductsFromSeller(sellersData.data)
        setProductsFromSellerLoaded(true)
    },[])

    return (
        !productsLoaded?
        <div className="loading"></div>
        :
        <div className="allsampleproducts">
       { /*axxitude products*/}
        {products.map(products => (
          <SampleProductCard sampleProductDetails={products} key={products.id} fromAxxitude={true} />
        ))}
       { /*seller products*/}
       {!productsFromSellerLoaded?
        <LoadingSellersProduct/>:
        <div className="allsampleproducts">
        {productsFromSeller.map(products => (
            <SampleProductCard sampleProductDetails={products} key={products._id} fromAxxitude={false} />
          ))}
        </div>}
        </div>
    )
}
export default SampleProducts