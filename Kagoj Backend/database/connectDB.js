const { Client } = require('pg');
require('dotenv').config()

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client
    .connect()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error', err.stack))

class Repository {
    constructor () {
        // If anything needs be done here
    }

    query = async function (query, params) {
        try {
            // console.log(query);
            const data = await client.query(query, params);
            return {
                success: true,
                data: data.rows
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                error
            }
        }
    }

}

exports.Repository = Repository;