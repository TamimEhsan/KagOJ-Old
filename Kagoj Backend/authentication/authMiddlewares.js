require('dotenv').config({ path: "../.env" });
const jwt = require('jsonwebtoken');



module.exports.isValidJWTTokenLevel1 = async (req, res, next) => {
    console.log("in level 1");
    if (req.headers['authorization']) {
        // console.log("inside authorization");

        try {
            // console.log(req.headers['authorization']);
            let authorization = req.headers['authorization'];
            
            if (!authorization) {
                return res.status(401).json({});
            } else {
                // console.log("inside else");
                // req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                const user = jwt.decode(authorization, process.env.JWT_SECRET);
                // console.log(user)
                if ( !user /*|| !user.authority*/ || user.authority < 0 ){
                    return res.status(403).send();
                }
                console.log(user);
                req.user = user;
                next();

            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send({ error: "Please attach access token in headers." });
    }
}

module.exports.isValidJWTTokenLevel2 = async (req, res, next) => {

    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] != 'Bearer') {
                return res.status(401).json({});
            } else {
                // req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                const user = jwt.decode(authorization[1], process.env.JWT_SECRET);
                if (user.authority < 2 ){
                    return res.status(403).send();
                }
                req.user = user;
                next();

            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send({ error: "Please attach access token in headers." });
    }
}

module.exports.isValidJWTTokenLevel3 = async (req, res, next) => {

    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] != 'Bearer') {
                return res.status(401).json({});
            } else {
                // req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                const user = jwt.decode(authorization[1], process.env.JWT_SECRET);
                if (user.authority < 3 ){
                    return res.status(403).send();
                }
                req.user = user;
                next();

            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send({ error: "Please attach access token in headers." });
    }
}

exports.isVerified = async (req, res, next) => {
    if (req.headers['api_key'] != process.env.API_KEY) {
        return res.status(401).send({ error: "Invalid secret token" });
    }
    next();
}