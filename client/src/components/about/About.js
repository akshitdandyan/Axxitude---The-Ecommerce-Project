import React from 'react';
import './about.css';
import { Helmet } from 'react-helmet';

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
           <div className='creator c1'>
               <h2>Akshit Dandyan</h2>
               <p className='bio'>Student at Chitkara University, 1st Year, B.E. CSE</p>
               <p className='role'>Roles : Designed Whole App and Idea of Axxitude,
                   Full Backend Development, Frontend UI's, State Management using
                   Redux, Optimization.
               </p>
           </div>
           <div className='creator c2'>
               <h2>Nidhi Sharma</h2>
               <p className='bio'>Student at Chitkara University, 1st Year, B.E. CSE</p>
               <p className='role'>Roles : Created Product Card Design, pop up alert on every actions,
                    Cart Design, App testing, fixed Bugs.
               </p>
           </div>
           <div className='creator c3'>
               <h2>Abhay Sikka</h2>
               <p className='bio'>Student at Chitkara University, 1st Year, B.E. CSE</p>
               <p className='role'>Roles : Developed UI for contact , sign in-up pages,
                   App testing, fixed bugs.
               </p>
           </div>
        </div>

        </div>
    )
}

export default About
