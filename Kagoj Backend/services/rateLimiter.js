const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 35
});

module.exports = limiter