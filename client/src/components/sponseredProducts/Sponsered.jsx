import './sponsered.css'
import React from 'react'
import { useSelector } from 'react-redux'
import SampleProductCard from './../sampleproducts/sampleproductcard/SampleProductCard'
function Sponsered() {
    const SponsoredItems = useSelector(state=>state.sponsored_reducer)
    return (
        <div className='sponsored'>
            <h3>Sponsored Products</h3>
            <div className='adContainer'>
            {SponsoredItems.map((item)=>
                <SampleProductCard sampleProductDetails={item} />
            )}
            </div>
        </div>
    )
}

export default Sponsered
