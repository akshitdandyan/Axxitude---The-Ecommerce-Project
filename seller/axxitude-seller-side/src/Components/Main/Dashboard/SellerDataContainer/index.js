import React from 'react'
import '../Dashboard.css'
import DC1 from './DC1/DC1'
import DC2 from './DC2/DC2'
import DC3 from './DC3/DC3'
const DC = () => {
    return (
        <div className='seller_data_container'>
            <DC1 />
            <DC2 />
            <DC3 />
        </div>
    )
}

export default DC