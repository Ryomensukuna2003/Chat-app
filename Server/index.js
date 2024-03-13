import cors from 'cors';
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Only allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

const PORT = 5000;
app.post('/api/login', (req, res) => {
    const { name, password } = req.body;
    console.log('Name:', name);
    console.log('Password:', password);

    res.status(200).json({ message: 'Login successful' });
})

io.on('connection', (socket) => {
    console.log('User Connected', socket.id);
    socket.on("chat", (res, room) => {
        if (room === '') {
            io.emit("sending_to_client", res); // For all
        }
        else {
            io.to(room).emit("sending_to_client", res);
        }
    })
    socket.on("join", (room) => {
        socket.join(room);
    })
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
})

server.listen(PORT, () => {
    console.log(`Server Listning at ${PORT}`);
})
