import React from 'react';
import light2 from '../../media/lightmode/light2.png';
import './Navbar.css';
import {Link} from 'react-router-dom';
function Navbar(){
    const linkStyles={
        textDecoration:"none",
        color:"black"
    }
    return(
        <>
            <div className="navbar">
                <div className="logo">
                    <Link to="/"><img src={light2} alt="AXXITUDE" /></Link>
                </div>
                <div className="menubar"><i className="fas fa-ellipsis-h"></i></div>
                <div className="links">
                    <Link to="/about" style={linkStyles}><span>About Us</span></Link>
                    <Link to="/register" style={linkStyles}><span>Register</span></Link>
                    <Link to="/signin" style={linkStyles}><span>Sign In</span></Link>
                    <Link to="/contact" style={linkStyles}> <span>Contact</span></Link>
                </div>
            </div>
        </>
    )
}
export default Navbar;