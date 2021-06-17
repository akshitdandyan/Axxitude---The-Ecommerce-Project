
const EachMessage = ({message,name}) => {
    let isSentByCurrentUser = false;
    const trimmedname = name.trim().toLowerCase();
    if(message.user===trimmedname){
        isSentByCurrentUser = true;
    }
    return (
        <div className="eachMessageContainer">
        <div className={isSentByCurrentUser?"alignRight eachMessage":"eachMessage"}>
           <div className="eachMessageSender">{isSentByCurrentUser? "You" : message.user}</div>
           <div className="eachMessageText">{message.text}</div>
        </div>
        </div>
    )
}

export default EachMessage
