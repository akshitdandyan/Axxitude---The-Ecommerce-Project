import * as chatFunction from './Users.js';
import { sendEmail } from '../Communication/index.js';
import allusers from './Users.js';

const ioCon = (io) => {
    io.on("connection", (socket) => {

        socket.on("join", ({ name,email,sellerEmail, room,type }, callback) => {
            if(type==="seller"){
                if(!allusers.length){
                    return callback({error:"NO USERS IN ROOM"})
                }
                const { error, user } = chatFunction.addUser({ id: socket.id, name, room });
                if (error) return callback(error);
                socket.emit('message', {user : 'Axxitude Bot', text: `Hey ${name}, Welcome to Chat.`});
                socket.emit('message', {user : 'Axxitude Bot', text: `Please make sure that you don't refresh window, else chat will be lost, we do not store chat between consumers and sellers to maintain their privacy.`});
                socket.broadcast.to(user.room).emit('message', {user: 'Axxitude Bot',text: `${name} joined the room.`})
                socket.join(user.room);
                io.to(user.room).emit('roomData',{room:user.room,users:chatFunction.getUsersInRoom(user.room)})
                callback();
                return
            }

            sendEmail(sellerEmail,`A consumer is waiting for you in chatAxx chat box. User details: ${name}, ${email}. Click this link to join chat: https://axxitudeseller.ml/chat?chatAxx=${room}`)
            const { error, user } = chatFunction.addUser({ id: socket.id, name, room });
    
            if (error) return callback(error);


            socket.emit('message', {user : 'Axxitude Bot', text: `Hey ${name}, Welcome to Chat. Please wait, we are informing seller via Email that you are here.`});
            socket.emit('message', {user : 'Axxitude Bot', text: `Please make sure that you don't refresh window, else chat will be lost, we do not store chat between consumers and sellers to maintain their privacy.`});

            socket.broadcast.to(user.room).emit('message', {user: 'Axxitude Bot',text: `${name} joined the room.`})
    
            socket.join(user.room);
    
            // io.to(user.room).emit('roomData',{room:user.room,users:chatFunction.getUsersInRoom(user.room)})
    
            callback();
        })
    
        socket.on('sendMessage', (message, callback) => {
            const user = chatFunction.getUser(socket.id);
            if (!user) return callback()
            io.to(user.room).emit('message', {user: user.name, text: message});
            // io.to(user.room).emit('roomData', {room:user.room, users:chatFunction.getUsersInRoom(user.room)})
            callback();
        })
        socket.on("disconnect", () => {
            const user = chatFunction.removeUser(socket.id)
            console.log(user);
            if(user.length){
                io.to(user[0].room).emit('message',{user:"Axxitude Bot",text: `Consumer has left.`})
            }
            console.log('user left');
        })
    });
}

export default ioCon;