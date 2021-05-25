import React, { useState, useEffect } from 'react'
import Filebase from 'react-file-base64'
import ProductCard from './ProductCard'
import { launch_product } from '../../../../Actions'
import { useSelector,useDispatch } from 'react-redux'
import { login_user } from '../../../../Actions'
import { useHistory } from 'react-router-dom'

const DC2 = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const products =  useSelector(state => state.sellerproducts_)
    const seller_data =  useSelector((state) => state.sellerdata)

    const sellerEmail = localStorage.getItem("seller_account_email")
    const [newProduct, setNewProduct] = useState({ ProductName: '', ProductDescription: '', ProductPrice: '', ProductCategory: '', Tags: '', ProductImage: '', SellerEmail: sellerEmail })
    const [product_form_visible, setProductFormVisibility] = useState(false)
    const [launchedProducts, setLauchedProducts] = useState([]);
    const [productsLoades,setProductsLoaded] = useState(false)
    const [loggedUserData,setLoggedUserData] = useState([])
    const [isFetched,setIsFetched] = useState(false)
    const [temp,settemp] = useState(false)
    const [TotalProducts,setTotalProducts] = useState(launchedProducts.length)

    useEffect(() => {
        setLoggedUserData(seller_data)
        const foo = async () => {
            setLauchedProducts(products)
            setProductsLoaded(true)
            setIsFetched(true)
        } 
        async function foo1(){
            if(products.length === 0 || seller_data.length === 0){
                if(localStorage.getItem("seller_account_email") == null){
                    history.push('/login')
                }
                await dispatch(login_user(localStorage.getItem("seller_account_email")))
            }
                foo() 
        }
        foo1()
    }, [products])
    useEffect(()=>{
        if(seller_data.length!==0 && seller_data[0]!==undefined){
        setTotalProducts(seller_data[0].TotalProducts)
        }
    },[seller_data])
    const HandleClick = async () => {
        setTotalProducts(TotalProducts+1)
        setProductFormVisibility(false)
        try {
            dispatch(launch_product(newProduct))
            setNewProduct({ ProductName: '', ProductDescription: '', ProductPrice: '', ProductCategory: '', Tags: '', ProductImage: '', SellerEmail: sellerEmail })
            settemp(!temp)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='DC2'>
                <div className='addProduct' onClick={() => setProductFormVisibility(!product_form_visible)} title='Launch new product'>
                    <span>+</span>
                </div>
                <div className='product_data'>
                    {isFetched ?
                    <>
                         <p>Total Products : {loggedUserData[0]!==undefined ? TotalProducts : 'Fetching...'}</p>
                         <p>Total Clicks on your Products : {loggedUserData[0]!==undefined  ? loggedUserData[0].ProductsClicked : 'Fetching...'}</p>
                         <p>Products Sold : {loggedUserData[0]!==undefined ? loggedUserData[0].ProductsSold : 0}</p>
                    </>
                         :
                         <>
                         <h4>Fetching...</h4>
                         </>
                    }
                   
                </div>
                <div className='seller_product_collection'>
                    {!launchedProducts.length===0 ?
                        <h1>Your products will be shown here</h1>
                        :
                        !productsLoades?<h1 style={{textAlign:'center',color:'white',fontFamily:"Sarala"}}>Loading...</h1>
                        :
                        launchedProducts.map((product) => <ProductCard props={product} key={product._id} />)
                        
                    }
                </div>
            </div>


            {/*  Product Launch Form :-*/}
            <div className={!product_form_visible ? 'product_form axx-form ' : 'product_form axx-form product_form_visible'} >
                <div className='close_product_form' onClick={() => setProductFormVisibility(false)}>x</div>
                <label>Product Name <span>*</span></label>
                <input type='text' value={newProduct.ProductName} required onChange={(e) => setNewProduct({ ...newProduct, ProductName: e.target.value })} />
                <label>Product Description<span>*</span></label>
                <textarea className='textarea' value={newProduct.ProductDescription} required onChange={(e) => setNewProduct({ ...newProduct, ProductDescription: e.target.value })} />
                <label>Product Pricing(in $) <span>*</span></label>
                <input type='number' required value={newProduct.ProductPrice} onChange={(e) => setNewProduct({ ...newProduct, ProductPrice: e.target.value })} />
                <label>Product Category<span>*</span></label>
                <div className='btn-container'>
                <select onChange={(e)=>setNewProduct({...newProduct,ProductCategory:e.target.value})} value={newProduct.ProductCategory}>
                        <option value="Fashion" >Fashion</option>
                        <option value="Electronics" >Electronics</option>
                        <option value="Grocery" >Grocery</option>
                        <option value="Other" >Other</option>
                </select>
                </div>
                <label>Tags (separated by space):<span>*</span></label>
                <input type='text' required value={newProduct.Tags} onChange={(e) => setNewProduct({ ...newProduct, Tags: e.target.value })} />
                <label style={{width:"100%",marginTop:"5px"}}>Upload Product Image <sup style={{fontSize:"12px"}}>(1 X 1 fits best)</sup></label>
                <Filebase type='file' required multiple={false} onDone={({ base64 }) => setNewProduct({ ...newProduct, ProductImage: base64 })} />
                <div className='btn-container'>
                    <button onClick={HandleClick}>Launch Product</button>
                </div>
            </div>
        </>
    )
}

export default DC2


