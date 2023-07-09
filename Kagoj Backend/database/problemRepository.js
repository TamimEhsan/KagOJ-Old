const Repository = require('./connectDB').Repository;


class ProblemRepository extends Repository {
    constructor() {
        super();
    }

    fetchAllUnderCourseByUser = async function (course_id) {
        const query =   `select * from problem
                        where problem.course_id = $1`;
        const params = [course_id];
        const result = await this.query(query,params);
        return result;
    }

    fetchById = async (problem_id) => {
        const query = `SELECT * FROM problem WHERE problem_id = $1`;
        const params = [problem_id];
        const result = await this.query(query,params);
        return result;
    }

    // fetchByCourseName = async (course_name) => {
    //     const query = `SELECT * FROM courses WHERE course_name = ${course_name}`;
    //     const result = await this.executeQuery(query);
    //     return result;
    // }

    // fetchByCourseCode = async (course_code) => {
    //     const query = `SELECT * FROM courses WHERE course_code = ${course_code}`;
    //     const result = await this.executeQuery(query);
    //     return result;
    // }

    // fetchByCourseId = async (course_id) => {
    //     const query = `SELECT * FROM courses WHERE course_id = ${course_id}`;
    //     const result = await this.executeQuery(query);
    //     return result;
    // }

    // fetchByUserId = async (user_id) => {
    //     const query = `SELECT * FROM courses WHERE user_id = ${user_id}`;
    //     const result = await this.executeQuery(query);
    //     return result;
    // }

    // insert = async (course) => {
    //     const query = `INSERT INTO courses (course_name, course_code, course_id, user_id) VALUES ('${course.course_name}', '${course.course_code}', '${course.course_id}', '${course.user_id}')`;
    //     const result = await this.executeQuery(query);
    //     return result;
    // }

    // update = async (course) => {
    //     const query = `UPDATE courses SET course_name = '${course.course_name}', course_code = '${course.course_code}', course_id = '${course.course_id}', user_id = '${course.user_id}' WHERE course_id = ${course.course_id}`;
    //     const result = await this.executeQuery(query);
    //     return result;
    // }

    // delete = async (course_id) => {
    //     const query = `DELETE FROM courses WHERE course_id = ${course_id}`;
    //     const result = await this.executeQuery(query);
    //     return result;
    // }

}

module.exports = new ProblemRepository();