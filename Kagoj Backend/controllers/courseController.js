const express = require('express');
const router = express.Router()

const CourseRepository = require('../database/courseRepository');
const ProblemRepository = require('../database/problemRepository');


router.get('/',fetch = async (req, res) => {
    
    const user = req.user;
    const result = await CourseRepository.fetchAllByUser(user.user_id);
    result.data = result.data.concat(result.data);
    result.data = result.data.concat(result.data);
    result.data = result.data.concat(result.data);
    res.status(200).send(result.data);
});

router.get('/:course_id',fetchProblemsUnderCourse = async (req, res) => {
    const { course_id } = req.params;
    if( course_id === undefined ){  
        res.status(400).send({"error":"Bad request"});
        return;
    }
    const result = await ProblemRepository.fetchAllUnderCourseByUser(course_id);
    result.data = result.data.concat(result.data);
    result.data = result.data.concat(result.data);
    result.data = result.data.concat(result.data);
    res.status(200).send(result.data);
});




module.exports = router;