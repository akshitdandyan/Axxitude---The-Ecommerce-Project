import React from 'react'
import man_taping_box from './../../../Media/VIDEO/man_taping_box.mp4'
function Video2() {
    return (
        <div className='video2'>
            <h1>
                Begin your business journey.
                Pack your products, upload to Axxitude.
                Wait for getting them into carts.
                And collect your cash.
            </h1>
            <video muted loop autoPlay>
                <source src={man_taping_box}type="video/mp4"/>
            </video>
        </div>
    )
}

export default Video2
