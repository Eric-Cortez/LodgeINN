const { validationResult } = require('express-validator');

//MIDDLEWARE - FORMATS ERRORS FOR EXPRESS-VALIDATOR 

const handleValidationErrors = (req, _res, next) => {

    const validationErrors = validationResult(req);
    console.log( validationErrors, "kkkkkkkk")
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};

module.exports = {
    handleValidationErrors,
};