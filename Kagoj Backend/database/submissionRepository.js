const Repository = require('./connectDB').Repository;


class SubmissionRepository extends Repository {
    constructor() {
        super();
    }
    create = async function (params) {
        const query = `insert into submission(problem_id,author_id,language_id,partial_verdict,final_verdict) 
        values($1,$2,$3,$4,$5) returning *`;
        const param = [params.problem_id,params.author_id,params.language_id,7,7]
        const result = await this.query(query,param);
        return result;
    }
    createSubmission = async function (params) {
        const query = `select create_submission($1,$2,$3) `;
        const param = [params.problem_id,params.author_id,params.language_id]
        const result = await this.query(query,param);
        return result;
    }
    updateVerdict = async function (submission_id,partial_verdict,final_verdict){
        const query = `update submission set partial_verdict = $1, final_verdict=$2 where submission_id=$3`;
        const params = [partial_verdict,final_verdict,submission_id];
        const result = await this.query(query,params);
        return result;
    }

    getAllByProblemId = async function (problem_id,user_id) {
        const query = `select * from submission where problem_id=$1 and author_id=$2 order by submission_id desc`;
        const params = [problem_id,user_id];
        const result = await this.query(query,params);
        return result;
    }

    getSubmissionById = async function (submission_id,user_id) {
        const query = `select * from submission where submission_id=$1 and author_id=$2`;
        const params = [submission_id,user_id];
        const result = await this.query(query,params);
        return result;
    }
}

module.exports = new SubmissionRepository();