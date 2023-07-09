const express = require('express');
const router = express.Router()

const ProfileRepository = require('../database/Auth/profileRepository');



router.get('/', fetch = async (req, res) => {
    const user = req.user;
    const result = await ProfileRepository.fetch(user.user_id);
    res.status(200).send(result.data[0]);
});



module.exports = router;