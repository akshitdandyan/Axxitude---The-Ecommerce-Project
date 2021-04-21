import React, { useState,useEffect } from 'react'
import Filebase from 'react-file-base64'
import {launchproduct} from '../../../../Api'
import ProductCard from './ProductCard'
import {getLauchedProducts} from './../../../../Api'
const DC2 = () => {
    const sellerEmail = localStorage.getItem("seller_account_email")
    const [newProduct, setNewProduct] = useState({ProductName:'',ProductDescription: '',ProductPrice: '',ProductCategory: '',Tags: '',ProductImage: '',SellerEmail:sellerEmail})
    const [product_form_visible,setProductFormVisibility] = useState(false)
    const [launchedProducts,setLauchedProducts] = useState([]);
    useEffect(() => {
       const foo = async() =>{
        const launchedProducts_ = await getLauchedProducts(sellerEmail);
        setLauchedProducts(launchedProducts_.data)
       }
       foo()
    }, [sellerEmail])
    const HandleClick = async() => {
        console.log(newProduct)
        try{
        await launchproduct(newProduct)
        console.log("LAUNCHED")
        }catch(err){
            console.log(err)
        }
    }
    return (
        <>
        <div className='DC2'>
            <div className='addProduct' onClick={()=> setProductFormVisibility(!product_form_visible)} title='Launch new product'>
                <span>+</span>
            </div>
            <div className='product_data'>
                <p>Total Products : 4</p>
                <p>Total Clicks on your Products : 27</p>
                <p>Products Sold : 2</p> 
            </div>
            <div className='seller_product_collection'>
                {!launchedProducts?
                    <h1>Your products will be shown here</h1>  
                    :
                    launchedProducts.map((product)=><ProductCard props={product} key={product.ProductName} />) 
            }
            </div>
        </div>


        {/*  Product Launch Form :-*/}
        <div className={!product_form_visible?'product_form axx-form ':'product_form axx-form product_form_visible'} onMouseLeave={()=>setProductFormVisibility(false)}>
                    <label>Product Name <span>*</span></label>
                    <input type='text' required onChange={(e) => setNewProduct({ ...newProduct, ProductName: e.target.value })} />
                    <label>Product Description<span>*</span></label>
                    <textarea className='textarea' required onChange={(e) => setNewProduct({ ...newProduct, ProductDescription: e.target.value })} />
                    <label>Product Pricing(in $) <span>*</span></label>
                    <input type='number' required onChange={(e) => setNewProduct({ ...newProduct, ProductPrice: e.target.value })} />
                    <label>Product Category<span>*</span></label>
                    <input type='text' required onChange={(e) => setNewProduct({ ...newProduct, ProductCategory: e.target.value })} />
                    <label>Tags (separated by space):<span>*</span></label>
                    <input type='text' required onChange={(e) => setNewProduct({ ...newProduct, Tags: e.target.value })} />
                    <label>Choose Profile Picture</label>
                    <Filebase type='file' required multiple={false} onDone={({ base64 }) => setNewProduct({ ...newProduct, ProductImage: base64 })} />
                    <div className='btn-container'>
                        <button onClick={HandleClick}>Launch Product</button>
                    </div>
        </div>
        </>
    )
}

export default DC2