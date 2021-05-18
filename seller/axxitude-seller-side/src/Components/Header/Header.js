import React,{useEffect, useState} from 'react'
import logo from '../../Media/LOGO/logo.png'
import './Header.css'
import { Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CLEARPRODUCTS, LOGINAUTH, LOGOUT, LOGOUTAUTH } from '../Constants/Constants'
import { login_user } from '../Actions'
import Popup from './../popup/Popup'
import AuthProcess from './../Login/AuthProcess'

function Header() {
    const [load,setLoad] = useState(false)
    const sellerData = useSelector(state=>state.sellerdata)
    const sellerProduct = useSelector(state=>state.sellerproducts_)
    useEffect(() => {
        if(localStorage.getItem('seller_account_email')!=='null'){
            setLoad(true)
           const isLogged= dispatch(login_user(localStorage.getItem('seller_account_email')))
           if(sellerProduct.length===0){
               setLoad(false)
           }

            dispatch({type:LOGINAUTH})
           
        }else{
            console.log("Sesion Expired 89:23:09 Sellers Axxitude");
        }
    }, []) 
    useEffect(() => {
        if(sellerData.length!==0 && sellerProduct.length!==0){
            setLoad(false)
        }
    }, [sellerData,sellerProduct])
    const isLoggedAuth = useSelector(state=>state.isLoggedIn);
    const [menuClick,setMenuClick] = useState(false)
    const History = useHistory()
    const dispatch = useDispatch()
    const Logout = () =>{
        localStorage.setItem('seller_account_email',null)
        dispatch({type:LOGOUT})
        dispatch({type:LOGOUTAUTH})
        dispatch({type:CLEARPRODUCTS})
        History.push('/login')
    }
    return (
        load ? <AuthProcess />:
        <div className="header">
            <div className="logo_container">
                <div className="logo">
                    <Link to={isLoggedAuth? '/dashboard':'/'}><img src={logo} alt='AXXITUDE' /></Link>
                </div>
            </div>
            <div className="menubar"><i className={menuClick?"far fa-caret-square-up":"far fa-caret-square-down"} onClick={()=>setMenuClick(!menuClick)}></i></div>
            <div className={menuClick?'nav_buttons_container':'nav_buttons_container hide_navbuttons'}>
                {!isLoggedAuth && <Link to='/register' style={{textDecoration:"none"}}><div className="nav_button">Register For Seller's Account</div></Link>}
                <Link to='/contact' style={{textDecoration:"none"}}><div className="nav_button">Contact</div></Link>
                <Link to='/about' style={{textDecoration:"none"}}><div className="nav_button">About Axxitude's Seller Side</div></Link>
                {isLoggedAuth? 
                    <div className="nav_button" onClick={Logout}>Logout</div>:
                    <Link to='/login' style={{textDecoration:"none"}}><div className="nav_button">Login</div></Link>
                }
            </div>
            <Popup />
        </div>
    )
}

export default Header
