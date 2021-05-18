import React, { useEffect } from 'react'
import './Main_Content.css'
import img1 from '../../../Media/IMAGES/thepng.png'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';
function Main_Content() {
    const history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('seller_account_email')!=='null'){
            history.push("/dashboard")
        }
    }, [])
    return (
        <div className="Main_Content">
            <div className='seller_image_1'>
                <img src={img1} alt="Promotional" />
            </div>
            <div className="promotional_1">
                <h1>Registering on Axxitude and put your products on sale won't take more than a minute!!!</h1>
                <Link to='/register' style={{textDecoration:"none"}}><button className='register_btn'>REGISTER</button></Link>
                <p>Already Registered?</p>
                <Link to='/login' style={{textDecoration:"none"}}><button className='signin_btn'>Sign In</button></Link>
            </div>
        </div>
    )
}

export default Main_Content
