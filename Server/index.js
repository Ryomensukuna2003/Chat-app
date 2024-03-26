import express from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./src/Routes/Users.js";
import { testMiddleware } from "./Middlewares/index.js"

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(testMiddleware("xyz"));

const PORT = 5000;

app.get("/test", (req, res) => {
    res.send("this is testing");
})
app.use('/api', router);

// Socket.io logic remains the same

server.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
