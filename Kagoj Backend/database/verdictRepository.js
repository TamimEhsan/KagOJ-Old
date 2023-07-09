const Repository = require('./connectDB').Repository;


class VerdictRepository extends Repository {
    constructor() {
        super();
    }
    updateVerdict = async function (params) {
        const query = `update verdict set result = $1, runtime = $2, memory = $3 where submission_id = $4 and test_id = $5`;
        const param = [params.result,params.runtime,params.memory,params.submission_id,params.test_id];
        const result = await this.query(query,param);
        return result;
    }

    getAllBySubmissionId = async function (submission_id,user_id) {
        const query = `select verdict.*,test.serial from verdict 
                        join submission on verdict.submission_id=submission.submission_id 
                        join test on test.test_id = verdict.test_id
                        where verdict.submission_id=$1 and submission.author_id=$2 order by test.serial asc`;
        const params = [submission_id,user_id];
        const result = await this.query(query,params);
        return result;
    }

}

module.exports = new VerdictRepository();