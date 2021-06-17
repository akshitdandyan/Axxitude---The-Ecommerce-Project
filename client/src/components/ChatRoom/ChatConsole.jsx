import './chat.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageContainer from './MessageContainer';
import listen from './voiceToText.js';

let socket;
const ChatConsole = (props) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const { chatCredentials } = props;
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = chatCredentials;
        socket = io(ENDPOINT)
        console.log(socket)
        socket.emit('join',{name, room},(err)=>{
            if(err) alert(err)
        })
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
            setMessages([...messages,message])
        })

    }, [messages])

    const sendMessage = (event) => {
        // event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=>setMessage(""))
        }
    }
    const leaveChat = () => {
        console.log('left');
        props.setAction(false)
        socket.disconnect()
    }
    // document.body.onkeyup = function(e){
    //     e.preventDefault()
    //     if(e.keyCode == 32){
    //         listen(setMessage)
    //     }
    // }
    return (
        <div className='ChatConsole'>
            <div className="chatConcoleHeader">
                Chat Room Activated ✅
            </div>
            <div className="showCredentials">
                <div>Name: {chatCredentials.name} 👤</div>
                <div>Room: {chatCredentials.room} 🛅</div>
            </div>
            <div className="leaveChat" onClick={leaveChat}>Leave Chat</div>
            <MessageContainer messages={messages} name={chatCredentials.name} />
            <div className='sender'>
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type Message..." onKeyPress={(e) => e.key === 'Enter' && sendMessage()}/>
                <button className="mic" onClick={()=>listen(setMessage)}><i className="fas fa-microphone"></i></button>
            </div>
        </div>
    )
}

export default ChatConsole
