const rateLimit = require("express-rate-limit");
const {httpCodes: {TOO_MANY_REQUESTS}} = require("../config");

// General API limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: TOO_MANY_REQUESTS,
        error: "Too many requests",
        message: "You have exceeded the 100 requests in 15 minutes limit!",
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

// Stricter limiter for auth/login routes
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        status: TOO_MANY_REQUESTS,
        error: "Too many login attempts",
        message: "Too many login attempts. Please try again after 5 minutes.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { apiLimiter, authLimiter };
