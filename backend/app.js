const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes')

const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const isProduction = environment === 'production';


const app = express(); 

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());// allows you to access body 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

if(!isProduction) {
    app.use(cors()); // use corse in development 
}

app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

app.use(routes);

//UNHANDLED REQUEST 
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// SEQUELIZE ERROR-HANDLER 
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

//ERROR FORMATTER 
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app; 