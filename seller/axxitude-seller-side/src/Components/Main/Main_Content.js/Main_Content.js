import React from 'react'
import './Main_Content.css'
import img1 from '../../../Media/IMAGES/seller_image_1.jpg'
function Main_Content() {
    return (
        <div className="Main_Content">
            <div className='seller_image_1'>
                <img src={img1} alt="Promotional Image" />
            </div>
            <div className="promotional_1">
                <h1>Registering on Axxitude and put your products on sale won't take more than a minute!!!</h1>
                <button className='register_btn'>REGISTER</button>
                <p>Already Registered?</p>
                <button className='signin_btn'>Sign In</button>
            </div>
        </div>
    )
}

export default Main_Content
