import { connect } from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB connected...');
    } catch (err) {
        logger.error('Database connection failed:', err);
        process.exit(1);
    }
};

export default connectDB;
