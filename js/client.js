//const socket=io('http://localhost:8000');
const socket = io('http://localhost:8000',{transports:['websocket']})

//Get DOM elements in respective JS variable
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio=new Audio('ting.mpeg');

//function which will append event info to the container
const append=(message, position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }
}

//If the form submitted , send server message  the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})

//Ask new user for her/his name and let the server know
const name= prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//if a new user joins, receive his/her name  from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

//if server sends a message receive it 
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})

//is a a user leaves the chat, append the info to the container
socket.on('left',name=>{
    append(`${name} left the chat`,'right')
})