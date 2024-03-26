import { execute } from '../src/Models/db_model.js';
import generateToken from '../src/Controllers/control.js'
import { config } from '../Config/index.js';
import jwt from 'jsonwebtoken';

async function login(req, res) {
    const { name, password } = req.body;
    const values1 = [name, password];
    const query1 = `SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 AND password_hash = $2)`;

    try {
        const queryResult = await execute(query1, values1);
        if (queryResult.rows.length > 0 && queryResult.rows[0].exists === true) {
            let token = generateToken({
                'name': name,
                'password': password
            }); // for token
            let datetime = new Date().toLocaleString();
            const values2 = [token, datetime, name, password];
            const query2 = `UPDATE users 
            SET refresh_token=$1, refresh_token_time=$2 
            WHERE username = $3 AND password_hash = $4;`;
            const result = await execute(query2, values2);
            res.status(200).json({ message: 'Login successful', token: token });
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

async function verify_token(req, res) {
    let token = req.body.token; 
    token = token.slice(1, -1); 
    jwt.verify(token,process.env.SUPER_SECRET_KEY,  async (err, decoded) => {
        if (err) console.log(err);
        else {
            let values = [decoded.username, decoded.password];
            const query = `SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 AND password_hash = $2)`;
            try {
                const queryResult = await execute(query, values);
                if (queryResult.rows.length > 0 && queryResult.rows[0].exists === true) {
                    res.json({ isValid: true });
                    console.log("Token Verified");
                } else {
                    res.status(401).json({ isValid: false });
                }
            } catch (error) {
                console.error('JWT auth failed:', error);
                res.status(500).json({ message: 'Error in JWT Auth' });
            }
        }
    })
}

export { login, signup, verify_token };

