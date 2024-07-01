
const { param, body, validationResult } = require('express-validator');

const addRoomValidator = [
    body('room_number')
        .isInt({ gt: 0 }).withMessage('Room number must be a positive integer')
        .notEmpty().withMessage('Room number is required'),

    body('floor')
        .isInt({ gt: 0 }).withMessage('Floor must be a positive integer')
        .notEmpty().withMessage('Floor is required'),

    body('capacity')
        .isInt({ gt: 0 }).withMessage('Capacity must be a positive integer')
        .notEmpty().withMessage('Capacity is required'),

    body('amenities')
        .optional()
        .custom(value => {
            if (typeof value === 'string') {
                // Allow empty string
                return true;
            }
            if (Array.isArray(value)) {
                // Check if each item in the array is a string
                return value.every(item => typeof item === 'string');
            }
            // If not a string or an array, return false
            return false;
        }).withMessage('Amenities must be a string or an array of strings'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ code: 400, message: 'Validation error', errors: errors.array() });
        }
        next();
    }
];


const updateRoomValidator = [

    param('id')
        .isMongoId().withMessage('Invalid room ID format')
        .notEmpty().withMessage('Request parmater id is required'),

    body('floor')
        .isInt({ gt: 0 }).withMessage('Floor must be a positive integer')
        .notEmpty().withMessage('Floor is required'),

    body('capacity')
        .isInt({ gt: 0 }).withMessage('Capacity must be a positive integer')
        .notEmpty().withMessage('Capacity is required'),

    body('amenities')
        .optional()
        .custom(value => {
            if (typeof value === 'string') {
                // Allow empty string
                return true;
            }
            if (Array.isArray(value)) {
                // Check if each item in the array is a string
                return value.every(item => typeof item === 'string');
            }
            // If not a string or an array, return false
            return false;
        }).withMessage('Amenities must be a string or an array of strings'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ code: 400, message: 'Validation error', errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    addRoomValidator,
    updateRoomValidator,
};
