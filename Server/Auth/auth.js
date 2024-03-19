import { execute } from '../src/Models/db_model.js';
import generateToken from '../src/Controllers/control.js'

async function login(req, res) {
    const { name, password } = req.body;
    const values1 = [name, password];
    const query1 = `SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 AND password_hash = $2)`;

    try {
        const queryResult = await execute(query1, values1);
        if (queryResult.rows.length > 0 && queryResult.rows[0].exists === true) {
            let token = generateToken(values1); // for token
            let datetime = new Date().toLocaleString();
            const values2 = [token, datetime, name, password];
            const query2 = `UPDATE users 
            SET refresh_token=$1, refresh_token_time=$2 
            WHERE username = $3 AND password_hash = $4;`;
            const result = await execute(query2, values2);
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Login Failed' });
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Error in login' });
    }
};


async function signup(req, res) {
    const { name, email, password } = req.body;
    let datetime = new Date().toLocaleString();
    const query = ` INSERT INTO users
                    (username, email, password_hash,date_created,modifiy_date)
                    VALUES ($1, $2, $3, $4, $4)`;
    const values = [name, email, password, datetime];

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
}

async function xyz(req, res) {
    console.log("inside signup");
    res.end("This is test");
}

export { login, signup, xyz };