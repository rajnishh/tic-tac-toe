import jwt from 'jsonwebtoken';
const { verify } = jwt;

/**
 * Middleware function to authenticate and verify the user's JWT token.
 * 
 * This middleware checks the `Authorization` header for a JWT token.
 * If a token is found, it is verified using the secret key. If valid,
 * the user's details (contained in the token) are attached to the request object.
 * If no token is found or the token is invalid, appropriate error responses are returned.
 * 
 * @param {Object} req - Express request object, containing the Authorization header.
 * @param {Object} res - Express response object, used to send error messages if unauthorized.
 * @param {Function} next - Express middleware function, called if the token is valid.
 * @returns {Object} Response with an error message if unauthorized, or proceeds to next middleware.
 */
export function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const cleanedToken = token.replace('Bearer ', '');
        const decoded = verify(cleanedToken, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}
