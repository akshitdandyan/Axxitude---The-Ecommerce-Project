import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../Dashboard/SellerDataContainer/DC2/ProductCard'

const AdvertisingDynamic = () => {
    const sellerProducts = useSelector(state=>state.sellerproducts_)
    const [products,setProducts] = useState([])
    useEffect(() => {
        setProducts(sellerProducts)
    }, [sellerProducts])
    return (
        <div className='AdvertisingDynamic'>
            <p>To start working with Sponsered Display, you just need to 
                pick products from below that you need to advertise.
            </p>
            <div className='productListAds'>
                {products.map((product)=><ProductCard props={product} key={product._id} tobeSponsored={true} />)}
            </div>
            <div style={{marginTop:"30px",display:"flex",justifyContent:"space-around"}}>
                <div>
                <div style={{width:"50px",height:"50px",color:"red",background:"black",borderRadius:"50%",display:"flex",justifyContent:"center",fontSize:"30px",paddingTop:"10px"}}><i class="fas fa-clipboard-check"></i></div>
                Un-Sponsored
                </div>
                <div>
                <div style={{width:"50px",height:"50px",color:"green",background:"black",borderRadius:"50%",display:"flex",justifyContent:"center",fontSize:"30px",paddingTop:"10px"}}><i class="fas fa-clipboard-check"></i></div>
                Sponsored
                </div>
            </div>
        </div>
    )
}

export default AdvertisingDynamic
