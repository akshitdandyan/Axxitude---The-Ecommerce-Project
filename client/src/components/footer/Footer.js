import React from 'react';
import './footer.css';
function Footer(){
    return(
        <div className="footer">

            <div className="connectwithus part">
                <h3>Connect with us</h3>
                <div>
                    <p><i className="fab fa-instagram"></i> Instagram</p>
                    <p><i className="fab fa-linkedin"></i> LinkedIN</p>
                    <p><i className="fab fa-whatsapp"></i> Whatsapp</p>
                </div>
            </div>

            <div className="feedback part">
                <h3>Give us a feedback</h3>
                <p>We are trying our best
                    to bring innovative
                    and value for money products to you.
                    Take a minute and tell us what you
                    liked and what we can improve
                    by clicking here.
                </p>
            </div>

            <div className="makemoney part">
                <h3>Make money with us <i className="fas fa-hand-holding-usd"></i></h3>
                <p>Sell on Axxitude</p>
                <p>Advertise your products</p>
                <p>Become brand ambassador</p>
                <p>Reffer products</p>
            </div>

            <div className="additional part">
                <h3>Conditions of use and sale</h3>
                <p>Just for demo purpose</p>
                <p><i className="far fa-copyright"></i>March 2021-May 2021,AXXITUDE,Inc or its affiliates</p>
            </div>
        </div>
    )
}
export default Footer;