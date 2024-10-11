import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.PYTHON_API_BASE_URL || 'http://localhost:8000';

const API_ENDPOINTS = {
    MOVES: `${BASE_URL}/move`,
};

export default API_ENDPOINTS;
