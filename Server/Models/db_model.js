import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'shivanshu',
    password: 'admin',
    host: 'localhost',
    port: '5432',
    database: 'postgres',
});

const execute = async function runQuery(queryText, values) {
    try {
        const res = await pool.query(queryText, values);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export { execute, pool };
