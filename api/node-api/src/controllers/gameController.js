import axios from 'axios';
import { findById } from '../models/userModel.js';
import { error as _error, info } from '../config/logger.js';
import API_ENDPOINTS from '../config/config.js';
const MOVES = API_ENDPOINTS.MOVES;
import { validationResult } from 'express-validator';

/**
 * Handles the game logic when a player makes a move.
 * It sends the current game state and player's move to the Python engine,
 * receives the computer's move, and updates the game status.
 * If the game is over, it updates the user's stats accordingly.
 * 
 * @param {Object} req - Express request object containing the player's move and board state.
 * @param {Object} res - Express response object to return the next move or game result.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Object} Response with the game state (next move, board state, or winner).
 */
export async function startGame(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { board, player } = req.body;

    try {
        const response = await axios.post(MOVES, { board, turn: player }); 

        const { move, status, winner } = response.data;

        if (status === "ongoing") {
            // If the game is ongoing, send the next move and current board state
            return res.json({ next_move: move, status, board: response.data.board });
        } else if (status === "over") {
            let result;
            if (winner === 'X') {
                result = 'win';
            } else if (winner === 'O') {
                result = 'lose';
            } else {
                result = 'draw';

            }

            await updateStatsInternal(req.user.userId, result);

            return res.json({ status, winner, board: response.data.board });
        }
    } catch (error) {
        console.error('Error calling Python API:', error);
        return res.status(500).json({ detail: "Error calling Python API" });
    }

    return res.status(400).json({ detail: "No valid moves left" });
}

/**
 * Internal function to update a user's game statistics (wins, losses, draws)
 * based on the result of the game.
 * 
 * @param {String} userId - The ID of the user whose stats need to be updated.
 * @param {String} result - The result of the game ('win', 'lose', 'draw').
 */
async function updateStatsInternal(userId, result) {
    const user = await findById(userId);
    try {
        if (result === 'win') user.wins += 1;
        else if (result === 'lose') user.losses += 1;
        else if (result === 'draw') user.draws += 1;

        await user.save();
        info(`Updated stats for user ${user.email}`);
    } catch (error) {
        console.error(`Error updating stats for user ${user.email}:`, error);
        throw new Error('Error updating user stats');
    }
}

/**
 * Retrieves the current game statistics (wins, losses, draws) for the authenticated user.
 * 
 * @param {Object} req - Express request object, containing the authenticated user.
 * @param {Object} res - Express response object to return the user's stats.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Object} JSON object with the user's wins, losses, and draws.
 */
export async function getStats(req, res, next) {
    try {
        const userId = req.user.userId;
        const user = await findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            wins: user.wins,
            losses: user.losses,
            draws: user.draws,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Updates the game statistics for the authenticated user based on the result of a game.
 * 
 * @param {Object} req - Express request object containing the result of the game ('win', 'lose', 'draw').
 * @param {Object} res - Express response object to confirm the update.
 * @param {Function} next - Express middleware function for error handling.
 * @returns {Object} Confirmation message that the stats have been updated.
 */
export async function updateStats(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { result } = req.body;
    const user = await findById(req.user.userId);
    try {
        if (result === 'win') user.wins += 1;
        else if (result === 'lose') user.losses += 1;
        else if (result === 'draw') user.draws += 1;

        await user.save();
        info(`Updated stats for user ${user.email}`);
        return res.json({ message: 'Stats updated' });
    } catch (error) {
        next(error);
    }
}
