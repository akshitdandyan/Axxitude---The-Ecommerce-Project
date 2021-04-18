import React from 'react'
import './Main.css'
import Video from './VideoComponent/Video1'
import Main_Content from './Main_Content.js/Main_Content'
import Video2 from './../Main/VideoComponent/Video2'
import ty from './../../Media/IMAGES/ty.png'
export default function Main() {
    return (
        <div className="main">
            <Video />
            <Main_Content />
            <Video2/>
            <div className='ty'>
                <img src={ty} alt='THANK YOU'/>
            </div>
        </div>
    )
}
