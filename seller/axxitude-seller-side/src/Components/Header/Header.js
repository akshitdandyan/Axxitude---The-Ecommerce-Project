import React,{useState} from 'react'
import logo from '../../Media/LOGO/logo.png'
import './Header.css'
function Header() {
    const [menuClick,setMenuClick] = useState(false)
    return (
        <div className="header">
            <div className="logo_container">
                <div className="logo">
                    <img src={logo} alt='AXXITUDE' />
                </div>
            </div>
            <div className="menubar"><i className={menuClick?"far fa-caret-square-up":"far fa-caret-square-down"} onClick={()=>setMenuClick(!menuClick)}></i></div>
            <div className={menuClick?'nav_buttons_container':'nav_buttons_container hide_navbuttons'}>
                <div className="nav_button">Register For Seller's Account</div>
                <div className="nav_button">Sign In As Seller</div>
                <div className="nav_button">Contact</div>
                <div className="nav_button">About Axxitude's Seller Side</div>
            </div>
        </div>
    )
}

export default Header
