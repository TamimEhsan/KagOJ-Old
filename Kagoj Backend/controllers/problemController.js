const express = require('express');
const router = express.Router()

const CourseRepository = require('../database/courseRepository');
const ProblemRepository = require('../database/problemRepository');


router.get('/:problem_id',fetchSpecificProblem = async (req, res) => {
    const { problem_id } = req.params;
    const result = await ProblemRepository.fetchById(problem_id);
    res.status(200).send(result.data[0]);
});



module.exports = router;