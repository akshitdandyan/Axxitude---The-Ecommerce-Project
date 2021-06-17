import './chat.css';

import React,{ useState} from 'react';
import ChatConsole from './ChatConsole';

const ChatBox = () => {
    const [chatCredential,setChatCredential] = useState({name:'', room:''});
    const [action,setAction] = useState(false)

    return (
        !action?<div className="ChatBox">
            <div className="ChatHeader">CHATBOX</div>
            <div className="ChatCredential">
                <input onChange={(e)=>setChatCredential({...chatCredential,name:e.target.value})} placeholder="Enter your name" />
                <input onChange={(e)=>setChatCredential({...chatCredential,room:e.target.value})} placeholder="Room" />
            </div>
            <div className="ChatCredentialAction">
                <button onClick={(e)=>(!chatCredential.name || !chatCredential.room)?e.preventDefault():setAction(true)}>GO!</button>
            </div>
        </div>:
        <ChatConsole chatCredentials={chatCredential} setAction={setAction} />
    )
}

export default ChatBox
