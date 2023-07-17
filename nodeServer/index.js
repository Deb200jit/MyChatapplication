//node server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket=>{
    //if any new user join, let other users connected to the server know
    socket.on('new-user-joined',name =>{
        //console.log("New user",name);
        users[socket.id] =name;
        socket.broadcast.emit('user-joined',name);
    });

    //if someone send the message brodcast it to other peoples
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

     //if someone leave the chat, lets other people
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
})