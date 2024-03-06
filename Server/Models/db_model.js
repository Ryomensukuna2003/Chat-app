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

const execute = async (query) => {
    try {
        await client.connect();     // gets connection
        await client.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();         // closes connection
    }
};


const text = `
    CREATE TABLE IF NOT EXISTS "users" (
        user_id         SERIAL          PRIMARY KEY,
        username        VARCHAR(50)     UNIQUE NOT NULL,
        password_hash   VARCHAR(60)     NOT NULL, 
        email           VARCHAR(100)    UNIQUE NOT NULL
    );`;

execute(text).then((result) => {
    if (result) {
        console.log('Table created');
    }
});

