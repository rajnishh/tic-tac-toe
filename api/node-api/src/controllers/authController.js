import { validationResult } from 'express-validator';
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import User from '../models/userModel.js'; 
import { info } from '../config/logger.js';

/**
 * Registers a new user if the email is not already in use.
 * 
 * @param {Object} req - Express request object, expects email and password in the body.
 * @param {Object} res - Express response object, used to send the response.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Object} - A JSON response with the JWT token if registration is successful.
 */
export async function register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ email, password });
        info(`New user registered: ${email}`);
        return res.status(201).json({ token: generateToken(user._id) });
    } catch (error) {
        next(error);
    }
}

/**
 * Logs in an existing user by validating credentials.
 * 
 * @param {Object} req - Express request object, expects email and password in the body.
 * @param {Object} res - Express response object, used to send the response.
 * @param {Function} next - Express next middleware function for error handling.
 * @returns {Object} - A JSON response with the JWT token if login is successful.
 */
export async function login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password)))
            return res.status(400).json({ message: 'Invalid credentials' });

        info(`User logged in: ${email}`);
        return res.json({ token: generateToken(user._id) });
    } catch (error) {
        next(error);
    }
}

/**
 * Generates a JWT token for user authentication.
 * 
 * @param {String} userId - The user's unique identifier.
 * @returns {String} - A signed JWT token with a 1-hour expiration.
 */
const generateToken = (userId) => {
    return sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
