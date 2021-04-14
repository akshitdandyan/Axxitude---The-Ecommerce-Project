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
        setMenuClick(false)
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
            </div>
        </>
    )
}
export default Navbar;