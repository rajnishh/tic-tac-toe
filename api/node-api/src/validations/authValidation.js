import { body } from 'express-validator';

const registerValidation = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').exists().withMessage('Password is required.'),
];

export default { registerValidation, loginValidation };
