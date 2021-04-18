import React, { useState } from 'react'
import './Video.css'
import video from '../../../Media/VIDEO/Seller_Side_1.mp4'
function Video() {
    const [is_vdo_closed, set_is_video_closed] = useState(false)
    return (
        <div className={is_vdo_closed ? 'set_video_closed' : 'video_container'}>
            {is_vdo_closed ? '' :
                <>
                    <video autoPlay controls muted>
                        <source src={video} type="video/mp4" />
                    </video>
                    <div className="Close_Video" onClick={() => set_is_video_closed(true)}><i class="far fa-window-close"></i></div>
                </>
            }

        </div>
    )
}

export default Video
