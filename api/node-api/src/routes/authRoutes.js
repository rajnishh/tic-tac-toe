import { Router } from 'express';
import { check } from 'express-validator';
import { register, login } from '../controllers/authController.js';
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    register
);

router.post(
    '/login',
    [
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    login
);

export default router;
