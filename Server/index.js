import express from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from 'body-parser';
import cors from 'cors';
import { execute } from './Models/db_model.js'; // Import execute function from db_model.js

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

const PORT = 5000;

app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
    const values = [name, password];
    const query = `SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 AND password_hash = $2)`;

    try {
        const queryResult = await execute(query, values);
        if (queryResult.rows.length > 0 && queryResult.rows[0].exists === true) {
            res.status(200).json({ message: 'Login successful' }); // Send response here
            console.log("Login Successful");
        } else {
            res.status(401).json({ message: 'Login Failed Bhosdike' }); // Send response here
            console.log("Login Failed");
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Error in login' }); // Send response here
    }
});



app.post('/api/signin', async (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)';
    const values = [name, email, password];

    try {
        const result = await execute(query, values);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'User Created' });
        } else {
            res.status(500).json({ message: 'Error in creating user' });
        }
    } catch (error) {
        console.error('Error in creating user:', error);
        res.status(500).json({ message: 'Error in creating user' });
    }
});


// Socket.io logic remains the same

server.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
