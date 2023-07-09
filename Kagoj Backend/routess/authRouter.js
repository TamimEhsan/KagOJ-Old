const express = require('express');
const router = express.Router()
const { login, register } = require('../authentication/authController');



router.post('/login', login);
router.post('/register', register);
// router.post('/verify/:token', applicantAuthController.ensure);
// router.post('/requestForgotPassword', applicantAuthController.requestForgotPassword);
// router.post('/forgotPassword', applicantAuthController.forgotPass);

module.exports = router;