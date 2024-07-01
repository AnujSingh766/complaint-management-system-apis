// validators/userValidator.js

const { body, validationResult } = require('express-validator');

const validateGetAllUsers = [
    // Example: Add validators if you expect any specific fields in the request body
    // body('someField').isString().withMessage('SomeField must be a string'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ code: 400, message: 'Validation error', errors: errors.array() });
        }
        next();
    }
];



const createUserValidate = [
    body('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required'),

    body('email')
        .isEmail().withMessage('Email must be a valid email address')
        .notEmpty().withMessage('Email is required'),

    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one digit')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
        .notEmpty().withMessage('Password is required'),

    body('phone_number')
        .isNumeric().withMessage('Phone number must be numeric')
        .isLength({ min: 10, max: 10 }).withMessage('Phone number must be a valid 10-digit number')
        .notEmpty().withMessage('Phone number is required'),

    body('room_id')
        .isMongoId().withMessage('Room ID must be a valid MongoDB ObjectId')
        .notEmpty().withMessage('Room ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ code: 400, message: 'Validation error', errors: errors.array() });
        }
        next();
    }
];


module.exports = {
    validateGetAllUsers,
    createUserValidate,
};
