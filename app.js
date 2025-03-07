/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

require('dotenv').config();

var path = require('path');
var express = require('express');
var session = require('express-session');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

// initialize express
var app = express();

/**
 * Using express-session middleware for persistent user session. Be sure to
 * familiarize yourself with available options. Visit: https://www.npmjs.com/package/express-session
 */
app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET || 'Enter_the_Express_Session_Secret_Here',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, // set this to true on production
        },
    })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const hbs = require('hbs');

// Register a custom helper for equality comparison
hbs.registerHelper('eq', function (a, b, options) {
    if (arguments.length < 3) {
        throw new Error('Handlebars Helper "eq" needs 2 parameters');
    }
    if (a === b) {
        return options.fn(this); // Render the block content if the condition is true
    }
    return options.inverse ? options.inverse(this) : ''; // Render the else block (if it exists) or return an empty string
});

hbs.registerHelper('isArray', function (value, options) {
    if (Array.isArray(value)) {
        return options.fn(this); // Render the block content if the value is an array
    } else {
        return options.inverse ? options.inverse(this) : ''; // Render the else block (if it exists) or return an empty string
    }
});

module.exports = app;
