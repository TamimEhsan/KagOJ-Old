const express = require('express');
const router = express.Router()

const ProfileController = require('../controllers/profileController');


router.get('/', ProfileController.fetch);
// router.post('/register', register);
// router.post('/verify/:token', applicantAuthController.ensure);
// router.post('/requestForgotPassword', applicantAuthController.requestForgotPassword);
// router.post('/forgotPassword', applicantAuthController.forgotPass);

module.exports = router;