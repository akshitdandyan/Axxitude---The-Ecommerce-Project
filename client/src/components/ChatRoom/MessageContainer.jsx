import EachMessage from "./EachMessage"

const MessageContainer = ({messages,name}) => {
    return (
        <div className="MessageContainer">
            {messages.length && messages.map((message,i)=><EachMessage key={i} message={message} name={name} />)}
        </div>
    )
}

export default MessageContainer
