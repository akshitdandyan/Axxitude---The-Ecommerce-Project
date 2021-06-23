import './chat.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageContainer from './MessageContainer';
import listen from './voiceToText.js';
import { generate_room } from '../../actions/actions'
let socket;
const ChatConsole = (props) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const { chatCredentials,sellerEmail } = props;
    const ENDPOINT = 'https://axxitude.herokuapp.com';

    useEffect(() => {
        const { name, room,email } = chatCredentials;
        socket = io(ENDPOINT)
        socket.emit('join',{name,sellerEmail, email, room},(err)=>{
            if(err) alert(err)
        })
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [ ...messages, message ]);
        })
    }, [])

    const sendMessage = (event) => {
        // event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=>setMessage(""))
        }
    }
    const leaveChat = () => {
        props.setRoom({...chatCredentials,room: generate_room()})
        props.setAction(false)
        socket.close()
    }
    // document.body.onkeyup = function(e){
    //     e.preventDefault()
    //     if(e.keyCode == 32){
    //         listen(setMessage)
    //     }
    // }
    return (
        <div className='ChatConsole'>
            <div className="chatAxxLogoContainer">
            <div className="chatAxxlogo"></div>
            </div>
            <div className="showCredentials">
                <div>Name: {chatCredentials.name} 👤</div>
            </div>
            <div className="chatActionButtons">
                <div className="leaveChat" onClick={leaveChat}>Leave Chat <i className="fas fa-sign-out-alt"></i></div>
                <div className="reportSeller" onClick={leaveChat}>Report Seller <i className="fas fa-exclamation-circle"></i></div>
            </div>
            <MessageContainer messages={messages} name={chatCredentials.name} />
            <div className='sender'>
                <div>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type Message..." onKeyPress={(e) => e.key === 'Enter' && sendMessage()}/>
                    <button onClick={()=>sendMessage()}><i className="fas fa-location-arrow"></i></button>
                </div>
                <button className="mic" onClick={()=>listen(setMessage)}><i className="fas fa-microphone"></i></button>
            </div>
        </div>
    )
}

export default ChatConsole
