import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/users.js';
import dotenv from 'dotenv';
import webpush from 'web-push';

import { Server } from "socket.io";
import { createServer } from "http";
import * as chatFunction from './ChatConsole/Users.js';

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: ['http://localhost:3000', 'http://localhost:3001', 'https://axxitude.ml', 'https://axxitudeseller.ml'] })


dotenv.config();

const publicVapidKey = process.env.PUBLICVAPIDKEY;
const privateVapidKey = process.env.PRIVATEVAPIDKEY;

webpush.setVapidDetails(
    'mailto:akshitdandyan@yandex.com',
    publicVapidKey,
    privateVapidKey
)


var allowedOrigins = { origin: ['http://localhost:3000', 'http://localhost:3001', 'https://axxitude.ml', 'https://axxitudeseller.ml'] };
app.use(cors(allowedOrigins));

app.get('/', (req, res) => res.send("AXXITUDE SERVERS 10.0"))
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// push notification only
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: "Welcome Back" })
    webpush.sendNotification(subscription, payload).catch(err => console.log(err))
})
//push notification only

app.use(router);

io.on("connection", (socket) => {

    socket.on("join", ({ name, room }, callback) => {
        console.log('user joined');
        const { error, user } = chatFunction.addUser({ id: socket.id, name, room });

        if (error) return callback(error);
        socket.emit('message', {user : 'admin', text: `Hey ${name}, Welcome to room ${room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin',text: `${name} joined the room.`})

        socket.join(user.room);

        io.to(user.room).emit('roomData',{room:user.room,users:chatFunction.getUsersInRoom(user.room)})

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = chatFunction.getUser(socket.id);
        console.log(user);
        io.to(user.room).emit('message', {user: user.name, text: message});
        io.to(user.room).emit('roomData', {room:user.room, users:chatFunction.getUsersInRoom(user.room)})
       
        callback();
    })
    socket.on("disconnect", () => {
        const user = chatFunction.removeUser(socket.id)
        if(user.length){
            io.to(user[0].room).emit('message',{user:"admin",text:`${user[0].name} has left.`})
        }
        console.log('user left');
    })
});

const DB_URL = process.env.DATABASE;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        httpServer.listen(process.env.PORT || 5000, () => console.log("SERVER running"))
    ).catch((err) => console.log(err.message))
mongoose.set('useFindAndModify', false);