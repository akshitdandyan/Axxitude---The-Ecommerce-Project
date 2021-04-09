import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/users.js';
import { registerUser } from './controllers/users.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

app.get('/',(req,res)=>res.send("Server Index"))

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.post('/register',registerUser)
app.use('/register',router);

const port = 5000;
const DB_URL = process.env.DATABASE;
mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(
        app.listen(port,()=>console.log("SERVER running on "+port))
    ).catch((err)=>console.log(err.message))
mongoose.set('useFindAndModify',false); 