import { execute } from '../src/Models/db_model.js';
import generateToken from '../src/Controllers/control.js'
import { config } from '../Config/index.js';
import jwt from 'jsonwebtoken';
import Queries from '../src/Controllers/Queries.js'
const {Checking_users,Updating_Users,Inserting_users} = Queries;

async function login(req, res) {
    const { name, password } = req.body;
    const values1 = [name, password];
    try {
        const queryResult = await execute(Checking_users, values1);
        if (queryResult.rows.length > 0 && queryResult.rows[0].exists === true) {
            let token = generateToken({
                'name': name,
                'password': password
            }); // for token
            let datetime = new Date().toLocaleString();
            const values2 = [token, datetime, name, password];
            const result = await execute(Updating_Users, values2);
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
    const values = [name, email, password, datetime];

    try {
        const result = await execute(Inserting_users, values);
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
            try {
                const queryResult = await execute(Checking_users, values);
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

