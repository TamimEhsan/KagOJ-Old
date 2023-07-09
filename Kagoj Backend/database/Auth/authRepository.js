const Repository = require('../connectDB').Repository;

class AuthRepository extends Repository {
    constructor () {
        super();
    }

    fetchByEmail = async function (email) {
        const query = `SELECT * FROM person WHERE email = $1`;
        const params = [email];
        return await this.query(query, params);
    }

    create = async function (email, password, authority,name) {
        const txStart = await this.query('BEGIN',[]);
        const queryPerson = `INSERT INTO person (email, password, authority) VALUES ($1, $2, $3) RETURNING *`;
        const paramsPerson = [email, password, authority];
        const personResult = await this.query(queryPerson, paramsPerson);
        if (!personResult.success) {
            await this.query('ROLLBACK',[]);
            return personResult;
        }
        const user_id = personResult.data[0].user_id;
        const queryProfile = `INSERT INTO profile (user_id,name) VALUES ($1, $2) RETURNING *`;
        const paramsProfile = [user_id,name];
        const profileResult = await this.query(queryProfile, paramsProfile);
        if (!profileResult.success) {
            await this.query('ROLLBACK',[]);
            return profileResult;
        }
        const txEnd = await this.query('COMMIT',[]);
        return profileResult
    }
}

module.exports = new AuthRepository();