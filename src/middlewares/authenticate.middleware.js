const {jwtToken:jwt} = require('../package');
const {userModel:User} = require('../models');
const {jwtSecret, httpCodes:{UNAUTHORIZED}} = require("../config");

module.exports = async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(UNAUTHORIZED).json({ message: 'Authorization token missing' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, jwtSecret);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(UNAUTHORIZED).json({ message: 'Invalid user' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(UNAUTHORIZED).json({ message: 'Authentication failed', error: error.message });
    }
};
