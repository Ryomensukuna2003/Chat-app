import { execute } from '../Models/db_model.js';

async function login(req, res) {
    const { name, password } = req.body;
    const values = [name, password];
    const query = `SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 AND password_hash = $2)`;

    try {
        const queryResult = await execute(query, values);
        if (queryResult.rows.length > 0 && queryResult.rows[0].exists === true) {
            res.status(200).json({ message: 'Login successful' }); 
        } else {
            res.status(401).json({ message: 'Login Failed Bhosdike' }); 
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Error in login' }); 
    }
};


async function signup(req,res){
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
}

export { login,signup };