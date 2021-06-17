import React from 'react';
import './about.css';
import { Helmet } from 'react-helmet';
import proPic from '../../media/mediumDP.jpeg';

function About() {
    return (
        
        <div className="about">

            <Helmet><title>About Axxitude</title></Helmet>

        <div className="shadow">
            <p>
                Axxitude is an E-commerce website demo project.
                Technologies used in developing Axxitude are 
                ReactJs, Redux and our backend includes of well known dependencies
                such as ExpressJs, Mongoose and MongoDB as database.
                For playing with apis, we have used axios.
                Atlast, we can say it a Full Stack real-time working application,
                where a user can add products to cart, buys them and even  can sell products
                on our platform Axxitude Sellers.
                Hope You Liked Our Hard Work, if you want to give any type of feedback, feel free
                to contact us.
                <br />
                <i>Thank You</i> 
            </p>
        </div>

        <div className="shadow">
           <div className='creator'>
               <div className='c1'>Meet Developer</div>
               <div className='dpOfCreator'>
                   <img src={proPic} alt="Developer" />
               </div>
               <div className="cbout">
               <div className='c2'>Akshit Dandyan</div>
               <div className="c3">Student at CUIET Chitkara, Persuing Bachelor Of Engineering in Computer Science.</div>
               <div className="c4">
                   Hello, I hope after exploring this web app,
                    you must be aware of my interests, tech stack I use, etc.
                    In case you want to contact me, here are my social links, have a great day.
               </div>
               </div>
               <div className="clinks">
                    <div><i className="fas fa-external-link-alt"><a href="mailto:info@eraaxit.ml" target="_avracadabra"> My Email</a></i></div>
                   <div><i className="fas fa-external-link-alt"><a href="https://www.linkedin.com/in/akshit-dandyan-604aaa1b3/" target="_avracadabra"> My Linkedin</a></i></div>
                   <div><i className="fas fa-external-link-alt"><a href="https://www.instagram.com/theaxitjaat/" target="_avracadabra"> My little Instagram</a></i></div>
               </div>
           </div>
        </div>

        </div>
    )
}

export default About
