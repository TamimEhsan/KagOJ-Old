const express = require('express');
const router = express.Router()
const CourseController = require('../controllers/courseController');



// router.get('/', login);
router.get('/', CourseController.fetch);
router.get('/:course_id', CourseController.fetchProblemsUnderCourse);

// router.post('/verify/:token', applicantAuthController.ensure);
// router.post('/requestForgotPassword', applicantAuthController.requestForgotPassword);
// router.post('/forgotPassword', applicantAuthController.forgotPass);

module.exports = router;