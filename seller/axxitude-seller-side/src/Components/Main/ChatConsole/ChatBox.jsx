import './chat.css';
import querySTR from 'query-string';

import React,{ useState} from 'react';
import ChatConsole from './ChatConsole';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChatBox = () => {
    const [chatCredential,setChatCredential] = useState({name:'', room:''});
    const [action,setAction] = useState(false)
    const { chatAxx } = querySTR.parse(window.location.search)
    const sellerData = useSelector(state => state.sellerdata)
    useEffect(()=>{
        if(!sellerData.length) return
        if(chatAxx){
            setChatCredential({name:sellerData[0].Fullname,room:chatAxx})
            setAction(true)
        }
    },[sellerData])

    return (
        !action?<div className="ChatBox">
           <div className="loader">
               <div></div>
           </div>
           <p style={{textAlign:"center",fontFamily:"Sarala"}}>Loading ChatAxx</p>
        </div>:
        <ChatConsole chatCredentials={chatCredential} setAction={setAction} />
    )
}

export default ChatBox
