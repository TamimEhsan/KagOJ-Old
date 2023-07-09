const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router()

const { isPasswordValid, makeHash } = require('./authServices');
const AuthRepository = require('../database/Auth/authRepository');


router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    // Fetching userData from database 

    let user = await AuthRepository.fetchByEmail(email);
    // if (type === "applicant") userInfo = await applicantAuthRepository.fetch(login);
    // if (type === "scrutiny") userInfo = await scrutinyAuthRepoistory.fetchByEmail(login);

    if (!user || !user.success) {
        return res.status(500).json({
            error: userInfo.error
        });
    }

    if (user.data.length == 0) {
        return res.sendStatus(404);
    }

    user = user.data[0];

    const hashPass = user.password;

    //  Add more info if needed


    if (hashPass && isPasswordValid(hashPass, password)) {
        let data = {
            user_id:user.user_id,
            email,
            authority: user.authority
        }
        const token = jwt.sign(data, process.env.JWT_SECRET);
        // await cacheRepository.update(token, login, type);

        // getAndDelete(login + type + 'cache');
        // createCache(login + type + 'cache', { token });

        res.json({token: token}).status(200);

    } else {
        res.status(401).send({ error: 'Invalid email or password' });
    }
});

router.post('/register', async (req, res, next) => {
    const { email, password, name } = req.body;

    // HERE we might need check to ensure the validation
    const findResult = await AuthRepository.fetchByEmail(email);
    if (!findResult.success) {
        return res.status(500).json({
            error: findResult.error
        });
    } else if (findResult.data.length != 0)
        return res.status(409).json({
            error: "User already exists"
        });

    const hashedPassword = makeHash(password);

   
    
    // const verifyToken = jwt.sign({
    //     login,
    //     password: hashedPassword,
    //     name
    // }, process.env.JWT_SECRET);
    // const user_login = "applicant" + login;

    // const findTokenResult = await cacheRepository.getToken(user_login, "verification");

    let result = await AuthRepository.create(email,hashedPassword,0,name);

    if (!result.success || result.data.length == 0) {
        return res.status(500).json({
            error: result.error
        });
    } 
    
    const user = result.data[0];

    let data = {
        user_id:user.user_Id,
        email,
        authority: user.authority
    }
    const token = jwt.sign(data, process.env.JWT_SECRET);
    // await cacheRepository.update(token, login, type);

    // getAndDelete(login + type + 'cache');
    // createCache(login + type + 'cache', { token });

    res.json({token: token}).status(200);
});

module.exports = router;