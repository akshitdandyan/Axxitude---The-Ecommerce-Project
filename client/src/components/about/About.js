import React from 'react';
import './about.css';

function About() {
    return (
        
        <div className="about">

        <div className="shadow">
            <p>
                Axxitude is an E-commerce website demo project.
                Various technologies used in developing Axxitude are
                ReactJS, NodeJS, Express,Redux and much more.
                Axxitude uses various api's to get sample Sample Products data
                provides by Amazon, Alibaba for developers.
            </p>
            <p>
                For storing user's data and performing all backend tasks
                Axxitude uses MongoDB. Atlast , it is MERN stack based project.
                Don't forget to give a feedback about it.
                Happy shopping and stalking.
            </p>
            <h3>THANK YOU</h3>
        </div>

        <div className="shadow">
            <h3>Creator: Akshit Dandyan</h3>
            <h3>Email : akshitdandyan@outlook.com</h3>
            <h3>About Creator:</h3>
            <p>Hey, this is Akshit ,2nd sem Computer Science Student
                I love creating web app projects and I enjoy learning
                new frameworks and libraries. Hope you liked my project.
                Thanks.
            </p>
        </div>

        </div>
    )
}

export default About
