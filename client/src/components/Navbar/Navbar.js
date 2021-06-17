import React,{ useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import light2 from '../../media/lightmode/light2.png';
import './Navbar.css';
import {Link} from 'react-router-dom';
import { logoutUser, userUpdatedData} from '../actions/actions.js'
import Popup from '../popup/Popup';
import {useHistory} from 'react-router-dom';
import decode from 'jwt-decode';

function Navbar(){
    const [menuClick,setMenuClick] = useState(false)
    const loginState = useSelector(state => state.isLoggedReducer)
    const [isLoggedIn,setIsLoggedIn] = useState(loginState)
    const dispatch = useDispatch()
    const history = useHistory();

    const logout=()=>{
        setIsLoggedIn(false)
        setMenuClick(false)
        dispatch(logoutUser)
        history.push('/')
    }

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("profile"))?.token;
        if(token){
            const decoded = decode(token);
            if(decoded.exp * 1000 < new Date().getTime()) {
                return logout()
            }
            dispatch(userUpdatedData(
                JSON.parse(localStorage.getItem("profile"))?.newUser._id
            ));
            setIsLoggedIn(true)
        }
    }, [dispatch,loginState])

    const linkStyles={
        textDecoration:"none",
        color:"black",
        height: '20px'
    }
    
    return(
        <>
            <div className="navbar">
                <div className="logo">
                    <Link to="/"><img src={light2} alt="AXXITUDE" onClick={()=>dispatch({type:'CLEARCATEGORY'})} /></Link>
                </div>
                <div className="menubar"><i className={menuClick?"far fa-caret-square-up":"far fa-caret-square-down"} onClick={()=>setMenuClick(!menuClick)}></i></div>
                <div className={menuClick?"links active":"links"} onBlur={()=>setMenuClick(false)}>
                    <Link to="/about" style={linkStyles} onClick={()=>setMenuClick(false)} ><span>About Us</span></Link>
                    {isLoggedIn===false &&
                    <>
                    <Link to="/register" style={linkStyles} onClick={()=>setMenuClick(false)} ><span>Register</span></Link>
                    <Link to="/signin" style={linkStyles} onClick={()=>setMenuClick(false)} ><span>Sign In</span></Link>
                    </>
                    }
                    <Link to="/contact" style={linkStyles} onClick={()=>setMenuClick(false)} > <span>Contact</span></Link>
                    {isLoggedIn && <Link to="/myProfile" style={linkStyles} onClick={()=>setMenuClick(false)} ><span>Profile</span></Link>}
                    {isLoggedIn && <div className="logout" onClick={logout}  >Log Out <i className="fas fa-power-off"></i></div>}
                </div>
                <Popup />
            </div>
        </>
    )
}
export default Navbar;