import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setNewPopUp } from '../actions/actions';

function Footer(){
    const dispatch = useDispatch()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[new Date().getMonth()];
    const year = new Date().getFullYear();
    return(
        <div className="footer">

            <div className="connectwithus part">
                <h3>Connect with us</h3>
                <div>
                    <a href="https://www.linkedin.com/in/akshit-dandyan-604aaa1b3/" target='_pp'><p><i className="fab fa-linkedin"></i> Linkedin</p></a>
                    <a href="https://www.instagram.com/theaxitjaat/" target="_pp"><p><i className="fab fa-instagram"></i> Instagram</p></a>
                    <a href="https://wa.me/7082703944" target="_pp"><p><i className="fab fa-whatsapp"></i> Whatsapp</p></a>
                    <a href="mailto:info@eraaxit.ml" target="_pp"><p><i className="far fa-envelope"></i> Email</p></a>
                </div>
            </div>

            <div className="feedback part">
                <h3>Give us a feedback</h3>
                <p>We are trying our best
                    to bring innovative
                    and value for money products to you.
                    Take a minute and tell us what you
                    liked and what we can improve
                    by <Link to='/contact' style={{textDecoration:"none",color:"white"}}>clicking here</Link>.
                </p>
            </div>

            <div className="makemoney part">
                <h3>Make money with us <i className="fas fa-hand-holding-usd"></i></h3>
                <a href="https://axxitudeseller.ml/" style={{textDecoration:"none",color:"white"}} target="_nextTab"><p>Sell on Axxitude</p></a>
                <a href="https://axxitudeseller.ml/" style={{textDecoration:"none",color:"white"}} target="_nextTab"><p>Advertise on Axxitude</p></a>
                <p onClick={()=>{
                        const popUpData = {title:"Under Development",body:"This feature is currently under development. Stay Tuned"};
                        dispatch(setNewPopUp(popUpData))
                }}>Become brand ambassador</p>
                <p  onClick={()=>{
                        const popUpData = {title:"Under Development",body:"This feature is currently under development. Stay Tuned"};
                        dispatch(setNewPopUp(popUpData))
                }}>Reffer products</p>
            </div>

            <div className="additional part">
               <h3>Conditions of use and sale</h3>
               <a href="https://axxitude.ml/termsofservice" style={{textDecoration:"none",color:"white"}}><p>Terms Of Services</p></a>
               <a href="https://axxitude.ml/privacypolicy" style={{textDecoration:"none",color:"white"}}> <p>Privacy Policy</p></a>
                <p>Web app for demo purpose</p>
                <p><i className="far fa-copyright"></i>May 2021-{month} {year},AXXITUDE,Inc or its affiliates</p>
            </div>
        </div>
    )
}
export default Footer;