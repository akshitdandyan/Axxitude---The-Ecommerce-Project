import React from 'react';
import './Advertising.css';

const AdvertisingStatic = () => {

    return (
        <div className='AdvertisingStatic'>
            <h1>Welcome to Axxitude Advertising</h1>
            <div className='promotionalDialogues'>
                <div className='activeWay'>
                    <h1>Sponsered Display</h1>
                    <p>Sponsored Display is a self-service display advertising solution that helps you grow your business
                    and brand on Axxitude by engaging shoppers across the purchase journey, on and off Axxitude.
                    </p>
                    <div className='getStarted'>
                        <div>Get Started</div>
                    </div>
                    
                </div>
                <div className='seprater'></div>
                <div className='ComingSoon'>
                    <h1>Coming Soon Advertising campaign on Axxitude</h1>
                    <h3>Stores</h3>
                    <p>Stores allow you to showcase your brand and products in a multipage, immersive shopping experience on Amazon.</p>
                    <h3>Video Ads</h3>
                    <p>Scale your reach across world-class content. Our video advertising solutions combine first-party insights,
                    measurement capabilities, exclusive inventory, and a unique relationship with Axxitude Publisher Services.
                </p>
                    <h3>Referal System</h3>
                    <p>Users and sellers both will earn by refering products with this upcoming feature.</p>

                </div>
            </div>
        </div>
    )
}

export default AdvertisingStatic
