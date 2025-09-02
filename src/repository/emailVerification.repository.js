const crypto = require('crypto');
const {emailVerificationModel: EmailVerification} = require("../models");

/**
 * Generates a verification token with hashed value and expiration
 * @returns {Object} Object containing original token, hashed token and expiration timestamp
 */
function generateEmailVerificationToken() {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const expires = Date.now() + 1000 * 60 * 5; // 5 minutes
    return {token, hashedToken, expires};
}

/**
 * Create or update a user's email verification record.
 * @param {string} userId - The ID of the user to create/update verification for
 * @returns {string} Unhashed verification token to send via email
 */
exports.sendEmailVerification = async (userId) => {
    const {token, hashedToken, expires} = generateEmailVerificationToken();

    await EmailVerification.findOneAndUpdate(
        {userId},
        {token: hashedToken, expiresAt: new Date(expires)},
        {upsert: true, new: true, setDefaultsOnInsert: true}
    );

    return token; // Return unhashed token to send via email
};

/**
 * Find a verification record by unhashed token (from email).
 * @param {string} rawToken - The unhashed verification token received from email
 * @returns {Promise<Object>} The verification record if found
 */
exports.findByToken = async (rawToken) => {
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    return await EmailVerification.findOne({token: hashedToken});
};

/**
 * Delete verification record by userId.
 * @param {string} userId - The ID of the user whose verification to delete
 * @returns {Promise<Object>} The result of deletion operation
 */
exports.deleteByUserId = async (userId) =>  await EmailVerification.deleteOne({userId});

/**
 * Delete verification record by _id (optional).
 * @param {string} _id - The ID of the verification record to delete
 * @returns {Promise<Object>} The deleted verification record
 */
exports.deleteById = async (_id) =>  await EmailVerification.findByIdAndDelete(_id);

/**
 * Check if a user has a pending (non-expired) verification request.
 * @param {string} userId - The ID of the user to check verification status for
 * @returns {Promise<boolean>} True if user has pending verification, false otherwise
 */
exports.hasPendingVerification = async (userId) => {
    const now = new Date();
    const record = await EmailVerification.findOne({
        userId,
        expiresAt: {$gt: now}
    });
    return !!record;
};