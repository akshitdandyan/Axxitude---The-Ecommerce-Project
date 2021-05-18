import React from 'react'
import { useDispatch } from 'react-redux';
import { setNewPopUp } from '../Actions';
import './Footer.css'
import {Link} from 'react-router-dom'
function Footer() {
    const dispatch = useDispatch()
    return (
        <div>
            <div className="footer">

                <div className="connectwithus part">
                    <h3>Connect with us</h3>
                    <div>
                        <a href="https://www.linkedin.com/in/akshit-dandyan-604aaa1b3/" style={{ textDecoration: "none", color: "white" }}target='_pp'><p><i class="fab fa-linkedin"></i> Linkedin</p></a>
                        <a href="https://www.instagram.com/theaxitjaat/"style={{ textDecoration: "none", color: "white" }} target="_pp"><p><i class="fab fa-instagram"></i> Instagram</p></a>
                        <a href="https://wa.me/7082703944"style={{ textDecoration: "none", color: "white" }} target="_pp"><p><i class="fab fa-whatsapp"></i> Whatsapp</p></a>
                        <a href="mailto:info@eraaxit.ml"style={{ textDecoration: "none", color: "white" }} target="_pp"><p><i class="far fa-envelope"></i> Email</p></a>
                    </div>
                </div>

                <div className="feedback part">
                    <h3>Give us a feedback</h3>
                    <p>We are trying our best
                    to bring innovative
                    and value for money products to you.
                    Take a minute and tell us what you
                    liked and what we can improve
        by <Link to='/contact' style={{ textDecoration: "none", color: "white" }}>clicking here</Link>.
    </p>
                </div>

                <div className="makemoney part">
                    <h3>Make money with us <i className="fas fa-hand-holding-usd"></i></h3>
                    <a href="https://axxitude.ml/" style={{ textDecoration: "none", color: "white" }} target="_nextTab"><p>Visit Axxitude Store</p></a>
                    <a href="https://axxitudeseller.ml/advertising" style={{ textDecoration: "none", color: "white" }} target="_nextTab"><p>Advertise on Axxitude</p></a>
                    <p onClick={() => {
                        const popUpData = { title: "Under Development", body: "This feature is currently under development. Stay Tuned" };
                        dispatch(setNewPopUp(popUpData))
                    }}>Become brand ambassador</p>
                    <p onClick={() => {
                        const popUpData = { title: "Under Development", body: "This feature is currently under development. Stay Tuned" };
                        dispatch(setNewPopUp(popUpData))
                    }}>Reffer products</p>
                </div>

                <div className="additional part">
                    <h3>Conditions of use and sale</h3>
                    <p>Just for demo purpose</p>
                    <p><i className="far fa-copyright"></i>March 2021-May 2021,AXXITUDE,Inc or its affiliates</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
