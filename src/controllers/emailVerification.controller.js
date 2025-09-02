const { emailVerificationService } = require("../service");
const { ApiError } = require("../utils");
const { httpCodes } = require("../config");

/**
 * Verify email from token (GET /verify-email?token=abc123)
 */
exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
    if (!token) {
        throw new ApiError(httpCodes.BAD_REQUEST, "Token is required");
    }

    await emailVerificationService.verifyEmail(token);
    return res.ok({}, "Email verified successfully");
};

/**
 * Resend email verification (POST /resend-verification)
 * Body: { email: "user@example.com" }
 */
exports.resendVerification = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(httpCodes.BAD_REQUEST, "Email is required");
    }

    await emailVerificationService.resendVerification(email);
    return res.ok({}, "Verification email resent successfully");
};