const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Access denied. Please log in first.'
        });
    }

    try {
        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verified;

        next();

    } catch (error) {
        return res.status(401).json({
            error: 'Invalid or expired token.'
        });
    }
}

module.exports = verifyToken;