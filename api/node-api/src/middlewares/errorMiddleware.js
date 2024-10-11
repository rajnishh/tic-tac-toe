import { error } from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
    error(err.message);
    res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
