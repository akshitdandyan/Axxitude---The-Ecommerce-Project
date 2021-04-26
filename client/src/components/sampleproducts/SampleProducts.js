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
    const [searchItem,setSearchItem] = useState("");
    useEffect(()=>{
        async function foo(){
            const sellersData = await dispatch(getProductsFromSellers);
            setProductsFromSeller(sellersData.data)
            setProductsFromSellerLoaded(true)
        }
        foo()
    },[dispatch])

    return (
        !productsLoaded?
        <div className="loading"></div>
        :
        <div className="allsampleproducts">
        <div className='SearchBox' style={{display:"flex",justifyContent:"center",minWidth:"90vw"}}>
            <input type='text' placeholder='Search Products...' onChange={(e)=>setSearchItem(e.target.value)}
            style={{width:"400px",height:"50px",fontSize:'20px',border:"none",outline:"none",maxWidth:"80vw",marginLeft:"40px",borderRadius:"20px",paddingLeft:"10px",background:"cyan"}} 
            />
            <i className="fab fa-searchengin" style={{fontSize:"30px",color:"green",position:"relative",right:"40px",top:"10px"}}></i>
        </div>
       { /*axxitude products*/}
        {products.filter((filtered_product)=>{
            if(searchItem===''){
                return filtered_product;
            }else if(filtered_product.title.toLowerCase().includes(searchItem.toLowerCase())){
                return filtered_product;
            }
        }).map(products => (
          <SampleProductCard sampleProductDetails={products} key={products.id} fromAxxitude={true} />
        ))}
       { /*seller products*/}
       {!productsFromSellerLoaded?
        <LoadingSellersProduct/>:
        <div className="allsampleproducts">
        {productsFromSeller.filter((filtered_product)=>{
            if(searchItem===''){
                return filtered_product;
            }else if(filtered_product.ProductName.toLowerCase().includes(searchItem.toLowerCase())){
                return filtered_product;
            }
        }).map(product => (
            <SampleProductCard sampleProductDetails={product} key={product._id} fromAxxitude={false} />
          ))}
        </div>}
        </div>
    )
}
export default SampleProducts