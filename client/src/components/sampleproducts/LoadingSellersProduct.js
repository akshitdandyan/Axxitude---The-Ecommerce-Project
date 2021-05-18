import React, { useEffect, useState } from 'react'
import './sampleproducts.css'

function LoadingSellersProduct() {
    const [meme,setmeme] = useState('')
    useEffect(() => {
        fetch('https://www.boredapi.com/api/activity/')
        .then(res=>res.json())
        .then((json)=>{
            setmeme(json.activity)
        })
    
    }, [])
    return (
        <div className='loadingProductANIMECONT'>
        <div className="seller_loading_anm">
            <div className="sla1 sla"></div>
            <div className="sla2 sla"></div>
            <div className="sla3 sla"></div>
            <div className="sla4 sla"></div>
            <div className="sla5 sla"></div>
        </div>
        <div className='meme'>
            {meme!=='' && <div>
                While your internet is fetching data with such a higher speed,
                why not {meme}</div>}
        </div>
        </div>
    )
}

export default LoadingSellersProduct
