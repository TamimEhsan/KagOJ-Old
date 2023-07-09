const express = require('express');
const router = express.Router()
const CourseController = require('../controllers/Courses/courseController');



// router.get('/', login);

router.get('/:problem_id', CourseController.fetchSpecificProblem);

// router.post('/verify/:token', applicantAuthController.ensure);
// router.post('/requestForgotPassword', applicantAuthController.requestForgotPassword);
// router.post('/forgotPassword', applicantAuthController.forgotPass);

module.exports = router;