const listen = (setMessage) => {
    if(window.hasOwnProperty('webkitSpeechRecognition')){
        var rec = new window.webkitSpeechRecognition();

        rec.continous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';
    
        rec.start();

        rec.onresult = (e) => {
            setMessage(e.results[0][0].transcript);
        }

        rec.onerror = (e) => {
            console.log("ERROR IN REC",e);
            rec.stop();
        }
    }
}

export default listen;