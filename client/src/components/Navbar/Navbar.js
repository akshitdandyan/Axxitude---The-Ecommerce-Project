import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import light2 from '../../media/lightmode/light2.png';
import './Navbar.css';
import {Link} from 'react-router-dom';
import {logoutUser} from '../actions/actions.js'
function Navbar(){
    const isLoggedIn = useSelector(state => state.isLoggedReducer);
    const dispatch = useDispatch();
    const logout=()=>{
        dispatch(logoutUser)
    }
    const linkStyles={
        textDecoration:"none",
        color:"black"
    }
    const [menuClick,setMenuClick] = useState(false)
    return(
        <>
            <div className="navbar">
                <div className="logo">
                    <Link to="/"><img src={light2} alt="AXXITUDE" /></Link>
                </div>
                <div className="menubar"><i className={menuClick?"far fa-caret-square-up":"far fa-caret-square-down"} onClick={()=>setMenuClick(!menuClick)}></i></div>
                <div className={menuClick?"links active":"links"}>
                    <Link to="/about" style={linkStyles}><span>About Us</span></Link>
                    {isLoggedIn===false &&
                    <>
                    <Link to="/register" style={linkStyles}><span>Register</span></Link>
                    <Link to="/signin" style={linkStyles}><span>Sign In</span></Link>
                    </>
                    }
                    <Link to="/contact" style={linkStyles}> <span>Contact</span></Link>
                    {isLoggedIn!==false && <Link to="/myProfile" style={linkStyles}><span>Profile</span></Link>}
                    {isLoggedIn!==false && <div className="logout" onClick={logout}>Log Out</div>}
                </div>
            </div>
        </>
    )
}
export default Navbar;