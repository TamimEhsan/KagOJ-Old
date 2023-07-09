const createError = require('http-errors');
const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()


const authController = require('./authentication/authController');
const profileController = require('./controllers/profileController');
const courseController = require('./controllers/courseController');
const problemController = require('./controllers/problemController');
const submissionController = require('./controllers/submissionController');

const {isValidJWTTokenLevel1} = require('./authentication/authMiddlewares');


const limiter = require('./services/rateLimiter');
require('./database/connectDB');

const app = express();

app.disable('etag')
app.set('trust proxy', true);

app.use(logger('common'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use(limiter);

// app.use('/auto_uploads', express.static('uploads'))

// const apiVersion = "/api/v1.0.0";




app.use('/api/auth', authController);
app.use(isValidJWTTokenLevel1);
app.use('/api/profile', profileController)
app.use('/api/course', courseController)
app.use('/api/problem', problemController)
app.use('/api/submission', submissionController)


app.all('*', (req, res) => {
    res.status(400).send('Bad Route');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
});

module.exports = app;