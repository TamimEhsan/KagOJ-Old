const Repository = require('./connectDB').Repository;


class TestRepository extends Repository {
    constructor() {
        super();
    }
    getAllByProblemId = async function (problem_id) {
        const query = `select * from test where problem_id=$1`;
        const params = [problem_id];
        const result = await this.query(query,params);
        return result;
    }
}

module.exports = new TestRepository();