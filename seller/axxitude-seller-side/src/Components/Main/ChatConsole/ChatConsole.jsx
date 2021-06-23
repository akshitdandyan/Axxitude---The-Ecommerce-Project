import './chat.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageContainer from './MessageContainer';
import listen from './voiceToText.js';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNewPopUp } from '../../Actions';

let socket;
const ChatConsole = (props) => {
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { chatCredentials } = props;
    const ENDPOINT = 'https://axxitude.herokuapp.com';
    const [consumername,setconsumername] = useState("")

    useEffect(() => {
        const { name, room } = chatCredentials;
        socket = io(ENDPOINT)
        socket.emit('join',{name, room, type:"seller"},(err)=>{
            if(err){
                const popUpData = {title:"CHAT NOT FOUND",body:"The link to chat is not found or the consumer may have left the chat."};
                dispatch(setNewPopUp(popUpData))
                history.push('/')
            }
        })
        socket.on('roomData',({users})=>{
            console.log("JO",users);
            setconsumername(users[0].name);
        })
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
            setMessages(messages => [ ...messages, message ]);
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=>setMessage(""))
        }
    }
    const leaveChat = () => {
        history.push('/dashboard')
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
            <div className="chatConcoleHeader">
                <div className="chatAxxlogo"></div>
            </div>
            <div className="chatterDetails">
                {consumername&&<div>You are currently chatting with {consumername}</div>}
            </div>
            <div className="leaveChat" onClick={leaveChat}>Leave Chat</div>
            <MessageContainer messages={messages} name={chatCredentials.name} />
            <div className='sender'>
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type Message..." onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}/>
                <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
                    <button className="mic" onClick={()=>listen(setMessage)}><i className="fas fa-microphone"></i></button>
                </div>
            </div>
        </div>
    )
}

export default ChatConsole
