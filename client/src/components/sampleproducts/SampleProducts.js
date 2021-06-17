import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import SampleProductCard from './sampleproductcard/SampleProductCard';
import { getProductsFromSellers } from '../api'
import './sampleproducts.css';
import LoadingSellersProduct from './LoadingSellersProduct';
import Sponsered from '../sponseredProducts/Sponsered';
import { Helmet } from 'react-helmet'

function SampleProducts() {
    const dispatch = useDispatch();
    // const [products, setProducts] = useState([]);
    // const [productsLoaded, setProductsLoaded] = useState(false);
    // useEffect(() => {
    //     fetch('https://fakestoreapi.com/products/')
    //         .then(res=>res.json())
    //         .then((json)=>{
    //             setProducts(json);
    //             setProductsLoaded(true);
    //         })
    //     .catch(err => {
    //         console.error(err);
    //     });
    // },[])

    const productsFromSeller = useSelector(state => state.products)
    const [productsFromSellerLoaded, setProductsFromSellerLoaded] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const cat = useSelector(state => state.CategoryReducer)
    const isPreview = useSelector(state => state.showProductReducer)
    const [preview, setPreview] = useState(false)
    const [startSlice,setStartSlice] = useState(0);
    const [endSlice,setEndSlice] = useState(40);
    const [disablePrev,setDisablePrev] = useState(true);
    const [disableNext,setDisableNext] = useState(false);
    const [currPage,setCurrPage] = useState(1);
    const category = useSelector(state=>state.CategoryReducer)

    useEffect(() => {
        if(category!==''){
            setStartSlice(0)
            setEndSlice(productsFromSeller.length)
        }
        setSearchItem(cat)
        setPreview(isPreview)
        if(productsFromSeller.length){        
            const ads = productsFromSeller.filter((item) => item.ad === true)
            dispatch({ type: "FETCH_ADS", payload: ads })
            setProductsFromSellerLoaded(true)
        }
    }, [dispatch, cat, isPreview,productsFromSeller])

    const NextPage = () => {
        if(disableNext){
            return
        }
        if(endSlice+40 > productsFromSeller.length){
            setStartSlice(endSlice+1)
            setEndSlice(productsFromSeller.length)
            setCurrPage(currPage+1)
            setDisableNext(true)
            setDisablePrev(false)
        }else if(endSlice+40 < productsFromSeller.length){
            setStartSlice(endSlice+1)
            setEndSlice(endSlice+40)
            setCurrPage(currPage+1)
            setDisablePrev(false)
        }
    }

    const PreviousPage = () => {
        if(disablePrev){
            return
        }
        if(startSlice===41){
            setStartSlice(0)
            setEndSlice(40)
            setDisablePrev(true)
            setDisableNext(false)
            setCurrPage(currPage-1)
        }else if(startSlice>41){
            setStartSlice(startSlice-40)
            setEndSlice(startSlice+39)
            setDisableNext(false)
            setCurrPage(currPage-1)
        }
    }
    const disableIndexing={
        background:"grey",
        cursor:"not-allowed"
    }

    return (
        // !productsLoaded?
        // <div className="loading"></div>
        // :
        <>
        <div className="allsampleproducts">
            <Helmet><title>{preview === false && 'Axxitude | Think Buy Grow'}</title></Helmet>
            <div className='SearchBox'>
                <input type='text' placeholder='Search Products...' onChange={(e) => setSearchItem(e.target.value)}
                    style={{ width: "400px", height: "50px", fontSize: '20px', border: "none", outline: "none", maxWidth: "80vw", marginLeft: "20px", borderRadius: "20px", paddingLeft: "10px", background: "cyan", filter: "opacity(90%" }}
                />
                <i className="fab fa-searchengin" onClick={()=>{
                    setStartSlice(0);
                    setEndSlice(productsFromSeller.length)
                    }} style={{ fontSize: "30px", color: "green", position: "relative", right: "40px", top: "10px" }}></i>
            </div>
            { /*axxitude products*/}
            <>
                {/* {products.filter((filtered_product)=>{
            if(searchItem===''){
                return filtered_product;
            }else if(filtered_product.title.toLowerCase().includes(searchItem.toLowerCase())){
                return filtered_product;
            }
        }).map(products => (
          <SampleProductCard sampleProductDetails={products} key={products.id} fromAxxitude={true} />
        ))} */}
            </>
            { /*seller products*/}
            <>
                {!productsFromSellerLoaded ?
                    <LoadingSellersProduct /> :
                    <div className="allsampleproducts">
                        {productsFromSeller.slice(startSlice,endSlice).filter((filtered_product) => {
                            if (searchItem === '') {
                                return filtered_product;
                            } else if (filtered_product.ProductName.toLowerCase().includes(searchItem.toLowerCase()) || filtered_product.ProductCategory.toLowerCase().includes(searchItem.toLowerCase()) || filtered_product.Tags.toLowerCase().includes(searchItem.toLowerCase())) {
                                return filtered_product;
                            }
                        }).map(product => (
                            <SampleProductCard sampleProductDetails={product} key={product._id} />
                        ))}
                    </div>}
            </>
            {searchItem !== "" && <Sponsered />}
        </div>
        {productsFromSellerLoaded && <div className='pageIndexing'>
            {disablePrev?  <div className='indexChangers' style={disableIndexing}><i className="fas fa-chevron-circle-left"></i></div>:
                            <div className='indexChangers' onClick={PreviousPage}><i className="fas fa-chevron-circle-left"></i></div>
            }
            <div>{currPage}</div>
            {disableNext ? <div className='indexChangers' style={disableNext ? disableIndexing : {color:"black"}} ><i class="fas fa-chevron-circle-right"></i></div> :
             <div className='indexChangers' onClick={NextPage}><i class="fas fa-chevron-circle-right"></i></div>
            }</div>}
        </>

    )
}
export default SampleProducts