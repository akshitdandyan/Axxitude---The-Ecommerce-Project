import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/users.js';
import dotenv from 'dotenv';
import webpush from 'web-push';

dotenv.config();

const publicVapidKey = process.env.PUBLICVAPIDKEY;
const privateVapidKey = process.env.PRIVATEVAPIDKEY;
webpush.setVapidDetails(
    'mailto:akshitdandyan@yandex.com',
    publicVapidKey,
    privateVapidKey
)

const app = express();


var allowedOrigins = {origin: ['http://localhost:3000', 'http://localhost:3001','https://axxitude.ml','https://axxitudeseller.ml']};
app.use(cors(allowedOrigins));

app.get('/',(req,res)=>res.send("AXXITUDE SERVERS 10.0"))
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

// push notification
app.post('/subscribe',(req,res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload =JSON.stringify({title:"Welcome Back"})
    webpush.sendNotification(subscription, payload).catch(err => console.log(err))
})

app.use(router);
const DB_URL = process.env.DATABASE;

mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(
        app.listen(process.env.PORT || 5000,()=>console.log("SERVER running"))
    ).catch((err)=>console.log(err.message))
mongoose.set('useFindAndModify',false);  