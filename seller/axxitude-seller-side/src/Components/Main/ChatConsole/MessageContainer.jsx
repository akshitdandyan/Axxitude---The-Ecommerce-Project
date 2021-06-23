import EachMessage from "./EachMessage";
import ScrollToBottom from 'react-scroll-to-bottom';


const MessageContainer = ({messages,name}) => {
    return (
        <ScrollToBottom className="MessageContainer">
            {messages.length && messages.map((message,i)=><EachMessage key={i} message={message} name={name} />)}
        </ScrollToBottom>
    )
}

export default MessageContainer
