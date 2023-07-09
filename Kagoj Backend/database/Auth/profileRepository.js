const Repository = require('../connectDB').Repository;

class ProfileRepository extends Repository {
    constructor () {
        super();
    }

    fetch = async function (user_id) {
        const query = `SELECT * FROM profile WHERE user_id = $1`;
        const params = [user_id];
        return await this.query(query, params);
    }

    // create = async function (user_id,name) {
        
    //     return await this.query(query, params);
    // }
}

module.exports = new ProfileRepository();