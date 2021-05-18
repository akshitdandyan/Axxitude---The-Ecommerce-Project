import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNewPopUp } from '../../Actions'
import './Contact.css'

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
        await axios.post('https://axxitude.herokuapp.com/post-feedback',newFeedback)
    }
    return (
        <div className='contact'>
            <div className='regards'>
                Thank you for showing interest in Axxitude Sellers.
                Please feel free to ask any questions, give feedbacks, suggestions and
                anything you want to discuss with us.
            </div>
            <div className='contactForm'>
                <div><input type='text' placeholder='Your Name' /></div>
                 <div><input type='text' placeholder='Your Email' /></div>
                <div> <input type='text' placeholder='Message' /></div>
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
