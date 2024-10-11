import { Router } from 'express';
import { check } from 'express-validator';
import { startGame, updateStats, getStats } from '../controllers/gameController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post(
    '/move',
    authMiddleware,
    [
        check('board', 'Board must be a 3x3 array').isArray({ min: 3, max: 3 }),
        check('player', 'Player must be "X" or "O"').isIn(['X', 'O']),
    ],
    startGame
);

router.post(
    '/stats',
    authMiddleware,
    [
        check('result', 'Result must be "win", "lose" or "draw"').isIn(['win', 'lose', 'draw']),
    ],
    updateStats
);

router.get('/stats', authMiddleware, getStats);

export default router;
