const express=require("express");
const http=require("http");
const bodyParser=require("body-parser");
const {Server}=require("socket.io");
require("dotenv").config();

const app=express();
const server=http.createServer(app);
const io=new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// const PORT=process.env.PORT;
const PORT= 5000;
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/Views/index.html');
})

io.on('connection',(socket)=>{
    console.log('User Connected',socket.id);
    socket.on('disconnect',()=>{
        console.log('User Disconnected');
    })
    socket.on("chat message",(msg)=>{
        console.log('message: '+msg);
        io.emit('chat message',msg);
    })
})

server.listen(PORT,()=>{
    console.log(`Server Listning at ${PORT}`);
})
