import React,{ useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import light2 from '../../media/lightmode/light2.png';
import './Navbar.css';
import {Link} from 'react-router-dom';
import {loginUser, logoutUser, setNewPopUp} from '../actions/actions.js'
import { LOGIN } from '../constants/actionTypes';
import Popup from '../popup/Popup';
import AuthProcess from '../../Loading/AuthProcess';
import {useHistory} from 'react-router-dom';

function Navbar(){
    const [menuClick,setMenuClick] = useState(false)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [loaded,setLoaded] = useState(false)
    const localemail = localStorage.getItem("user%^&*()email_666");
    const localpassword = localStorage.getItem("password%^&*()_891");
    const dispatch = useDispatch()
    const history = useHistory();
    useEffect(() => {
        async function init(){
            if(localemail==='null' || localpassword==='null'){
                console.log("Session expired 90:39:12 IO() Axxitude");
            }else if(localemail !== null && localpassword !== null ){
                setIsLoggedIn(true)
                setLoaded(true)
                const isLogged = await dispatch(loginUser({email:localemail,password:localpassword}))
                dispatch({type:LOGIN}) 
                if(isLogged){
                    setLoaded(false)
                }else{
                    setLoaded(false)
                    setIsLoggedIn(false)
                    const popUpData = {title:"Error",body:"We are unable to make you sign in right now. Please check your credentials carefully"};
                    dispatch(setNewPopUp(popUpData))
                }
            }
        }
        init()
    }, [dispatch,localemail,localpassword])

    const logout=()=>{
        setIsLoggedIn(false)
        setMenuClick(false)
        dispatch(logoutUser)
        history.push('/')
    }
    const linkStyles={
        textDecoration:"none",
        color:"black",
        height: '20px'
    }
    
    return(
        <>
            <div className="navbar">
                {loaded && <AuthProcess />}
                <div className="logo">
                    <Link to="/"><img src={light2} alt="AXXITUDE" onClick={()=>dispatch({type:'CLEARCATEGORY'})} /></Link>
                </div>
                <div className="menubar"><i className={menuClick?"far fa-caret-square-up":"far fa-caret-square-down"} onClick={()=>setMenuClick(!menuClick)}></i></div>
                <div className={menuClick?"links active":"links"}>
                    <Link to="/about" style={linkStyles} onClick={()=>setMenuClick(false)} ><span>About Us</span></Link>
                    {isLoggedIn===false &&
                    <>
                    <Link to="/register" style={linkStyles} onClick={()=>setMenuClick(false)} ><span>Register</span></Link>
                    <Link to="/signin" style={linkStyles} onClick={()=>setMenuClick(false)} ><span>Sign In</span></Link>
                    </>
                    }
                    <Link to="/contact" style={linkStyles} onClick={()=>setMenuClick(false)} > <span>Contact</span></Link>
                    {isLoggedIn!==false && <Link to="/myProfile" style={linkStyles} onClick={()=>setMenuClick(false)} ><span>Profile</span></Link>}
                    {isLoggedIn!==false && <div className="logout" onClick={logout}  >Log Out</div>}
                </div>
                <Popup />
            </div>
        </>
    )
}
export default Navbar;