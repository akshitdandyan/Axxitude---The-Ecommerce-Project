import React,{useState} from 'react'
import logo from '../../Media/LOGO/logo.png'
import './Header.css'
import { Link } from 'react-router-dom'
function Header() {
    const [menuClick,setMenuClick] = useState(false)
    return (
        <div className="header">
            <div className="logo_container">
                <div className="logo">
                    <Link to='/'><img src={logo} alt='AXXITUDE' /></Link>
                </div>
            </div>
            <div className="menubar"><i className={menuClick?"far fa-caret-square-up":"far fa-caret-square-down"} onClick={()=>setMenuClick(!menuClick)}></i></div>
            <div className={menuClick?'nav_buttons_container':'nav_buttons_container hide_navbuttons'}>
                <Link to='/register' style={{textDecoration:"none"}}><div className="nav_button">Register For Seller's Account</div></Link>
                <div className="nav_button">Sign In As Seller</div>
                <div className="nav_button">Contact</div>
                <div className="nav_button">About Axxitude's Seller Side</div>
            </div>
        </div>
    )
}

export default Header
