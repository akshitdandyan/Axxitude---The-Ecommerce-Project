import React, { useState } from 'react';
import './contact.css';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setNewPopUp } from '../actions/actions';

const Contact = () => {
    const dispatch = useDispatch()
    const [feedback,setFeedback] = useState({name:'',email:'',message:''})
    const sendFeedback = async() => {
        if(feedback.name==='' || feedback.email==='' || feedback.message===''){
            const popUpData = {title:"Not Allowed",body:"You can't leave any of these fields empty in order to post a feedback."};
            dispatch(setNewPopUp(popUpData))
            return
        }
        const newFeedback = feedback
        const popUpData = {title:"Feedback Sent ✔",body:"Thanks for contacting us. We will reply soon. Have a nice day"};
        dispatch(setNewPopUp(popUpData))
        setFeedback({name:'',email:'',message:''})
        await axios.post('http://localhost:5000/post-feedback',newFeedback)
    }

    return (
        <div className='contact'>
            <div className='regards'>
                Thank you for showing interest in Axxitude .
                Please feel free to - ask any questions, give feedbacks,request features, report bugs, report products, suggestions and
                anything you want to discuss with us.
            </div>
            <div className='contactForm'>
                <div><input type='text' placeholder='Your Name' value={feedback.name} onChange={(e)=>setFeedback({...feedback,name:e.target.value})} /></div>
                 <div><input type='text' placeholder='Your Email' value={feedback.email} onChange={(e)=>setFeedback({...feedback,email:e.target.value})}/></div>
                <div> <input type='text' placeholder='Message' value={feedback.message} onChange={(e)=>setFeedback({...feedback,message:e.target.value})}/></div>
                <div className='btn' onClick={sendFeedback}>Send</div>
            </div>
            <div className='socialMedia'>

                <a href="https://www.linkedin.com/in/akshit-dandyan-604aaa1b3/" target='_pp'><div><i class="fab fa-linkedin"></i></div></a>
                <a href="https://www.instagram.com/theaxitjaat/" target="_pp"><div><i class="fab fa-instagram"></i></div></a>
                <a href="https://wa.me/7082703944" target="_pp"><div><i class="fab fa-whatsapp"></i></div></a>
                <a href="mailto:info@eraaxit.ml" target="_pp"><div><i class="far fa-envelope"></i></div></a>

            </div>
        </div>
    )
    }
export default Contact
