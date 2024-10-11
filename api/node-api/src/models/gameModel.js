import { Schema, model } from 'mongoose';

const gameSchema = new Schema({
    player1: { type: Schema.Types.ObjectId, ref: 'User' },
    player2: { type: Schema.Types.ObjectId, ref: 'User' },
    board: { type: Array, default: Array(9).fill(null) },
    currentTurn: { type: String },
    winner: { type: String, default: null },
});

export default model('Game', gameSchema);
