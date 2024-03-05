const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
    user: 'shivanshu',
    password: 'admin',
    host: 'localhost',
    port: '5432',
    database: 'postgres',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });
