import './chat.css';
import chatAxxVideo from './../../../media/Videos/chatAxx.mp4';
import { generate_room } from '../../actions/actions.js';


import React,{ useEffect, useState} from 'react';
import ChatConsole from './ChatConsole';

const ChatBox = (props) => {
    const [chatCredential,setChatCredential] = useState({name:'', email:'',room:''});
    const [action,setAction] = useState(false)

    useEffect(() => {
        const loggedUserData = JSON.parse(localStorage.getItem('profile'));
        if(loggedUserData){
            setChatCredential({name:loggedUserData.newUser.firstname,email:loggedUserData.newUser.email,room:''})
        }
        setChatCredential({...chatCredential,room: generate_room()});
    }, [])

    return (
        !action?<div className="ChatBox">
            <div className="closeChatBox" onClick={()=>props.setChatEnabled(false)}>
                See Reviews
            </div>
            <div className="chatConsoleVideo">
                <video src={chatAxxVideo} autoPlay muted></video>
            </div>
            <div className="ChatCredential">
                <input value={chatCredential.name} onChange={(e)=>setChatCredential({...chatCredential,name:e.target.value})} placeholder="Enter your name" />
                <input value={chatCredential.email} onChange={(e)=>setChatCredential({...chatCredential,email:e.target.value})} placeholder="Enter your email" type="email" />
            </div>
            <div className="ChatCredentialAction">
                <button onClick={(e)=>(!chatCredential.name || !chatCredential.email || !chatCredential.room)?e.preventDefault():setAction(true)}>GO!</button>
            </div>
        </div>:
        <ChatConsole chatCredentials={chatCredential} setAction={setAction} setRoom={setChatCredential} sellerEmail={props.SellerEmail} />
    )
}

export default ChatBox
