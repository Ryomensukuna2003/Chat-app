import express from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./Routes/Users.js";
import {testMiddleware} from "./Middlewares/index.js"

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(testMiddleware);

const PORT = 5000;

app.use("/api",router);

// Socket.io logic remains the same

server.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
