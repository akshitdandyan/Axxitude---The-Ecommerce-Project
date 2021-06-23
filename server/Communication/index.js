import nodemailer from 'nodemailer'

export const sendEmail = async (email,message) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'axxitude.noreply@eraaxit.tech',
            pass: '8gjEUyynwvA!TGD'
        }
    })

    const mailOptions = {
        from: 'Axxitude <axxitude.noreply@eraaxit.tech>',
        to: email,
        subject: 'NEW CONSUMER WAITING FOR YOU IN CHATBOX',
        text:message,
    }


    transporter.sendMail(mailOptions, (err,info)=>{
        if(err) return console.log("WOOPS",err);
        else return console.log("SENT",info.response);
    })
}

export const SendWelcomeEmail = async(email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'catalina@eraaxit.tech',
            pass: 'catalinalovesjohnson'
        }
    })

    const mailOptions = {
        from: 'Catalina From Axxitude <catalina@eraaxit.tech>',
        to: email,
        subject: 'Welcome to Axxitude - The Ecommerce',
        html:{path:"EmailTEMPLATES/emailtemplatefeedback/welcome.html"},
    }


    transporter.sendMail(mailOptions, (err,info)=>{
        if(err) return console.log("WOOPS",err);
        else return console.log("SENT",info.response);
    })
}