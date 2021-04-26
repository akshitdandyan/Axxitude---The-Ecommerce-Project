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

    useEffect(() => {
        const foo = async () => {
            setLauchedProducts(products)
            setProductsLoaded(true)
            setLoggedUserData(seller_data)
            setIsFetched(true)
        } 
        if(products.length === 0 || seller_data.length === 0){
            console.log(localStorage.getItem("seller_account_email"));
            if(localStorage.getItem("seller_account_email") == null){
                history.pushState('/login')
            }
            dispatch(login_user(localStorage.getItem("seller_account_email")))
        }else{

            foo()
        } 
    }, [sellerEmail, product_form_visible,temp,products,seller_data,dispatch,history])
    const HandleClick = async () => {
        setProductFormVisibility(false)
        try {
            console.log(newProduct)
            dispatch(launch_product(newProduct))
            settemp(!temp)
        } catch (err) {
            console.log(err)
        }
        setNewProduct({ ProductName: '', ProductDescription: '', ProductPrice: '', ProductCategory: '', Tags: '', ProductImage: '', SellerEmail: sellerEmail })
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
                         <p>Total Products : {isFetched ? loggedUserData[0].TotalProducts : 'Fetching...'}</p>
                         <p>Total Clicks on your Products : {isFetched ? loggedUserData[0].ProductsClicked : 'Fetching...'}</p>
                         <p>Products Sold : 0</p>
                    </>
                         :
                         <h4>Fetching your data...</h4>
                    }
                   
                </div>
                <div className='seller_product_collection'>
                    {!launchedProducts ?
                        <h1>Your products will be shown here</h1>
                        :
                        !productsLoades?<h1 style={{textAlign:'center',color:'white',fontFamily:"Sarala"}}>LOADING...</h1>
                        :
                        launchedProducts.map((product) => <ProductCard props={product} key={product._id} />)
                        
                    }
                </div>
            </div>


            {/*  Product Launch Form :-*/}
            <div className={!product_form_visible ? 'product_form axx-form ' : 'product_form axx-form product_form_visible'} >
                <div className='close_product_form' onClick={() => setProductFormVisibility(false)}>x</div>
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


