import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/users.js';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(cors());

app.get('/',(req,res)=>res.send("AXXITUDE SERVERS 6.0"))
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use(router);
const DB_URL = process.env.DATABASE;

mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(
        app.listen(process.env.PORT || 5000,()=>console.log("SERVER running"))
    ).catch((err)=>console.log(err.message))
mongoose.set('useFindAndModify',false);  