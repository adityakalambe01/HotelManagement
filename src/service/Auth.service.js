const { userRepository } = require("../repository");
const { httpCodes } = require("../config")
const { ApiError, pick} = require("../utils");
const {triggerEmailVerification} = require("./emailVerification.service")


/**
 * Register a new user in the system
 * @param {Object} newUser - User information for registration
 * @param {string} newUser.email - Email address of the user
 * @param {string} newUser.password - Password for the user account
 * @param {string} newUser.name - Name of the user
 * @returns {Promise<Object>} Created user object
 * @throws {ApiError} If user already exists or registration fails
 */
exports.register = async (newUser) => {
    const existingUser = await userRepository.findByEmail(newUser.email, '');
    if (existingUser) {
        throw new ApiError(httpCodes.BAD_REQUEST, "User already exists");
    }
    const user = await userRepository.createUser(newUser);
    if (!user) {
        throw new ApiError(httpCodes.BAD_REQUEST, "User registration failed")
    }
    await triggerEmailVerification(user);
    return user;
}

/**
 * Authenticate user and generate access token
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} Object containing authentication token and user details
 * @throws {ApiError} If authentication fails, email not verified, or user not found
 * @property {string} token - JWT authentication token
 * @property {Object} user - User object containing user details
 */
exports.login = async (email, password) => {
    let user = await userRepository.findByEmail(email, '', 2);
    if (!user) {
        throw new ApiError(httpCodes.UNAUTHORIZED, "User not found");
    }
    const isValidPassword = await userRepository.comparePassword(user, password);
    if (!isValidPassword) {
        throw new ApiError(httpCodes.UNAUTHORIZED, "Incorrect password");
    }
    if (!user.toObject().isEmailVerified) {
        throw new ApiError(httpCodes.UNAUTHORIZED, "Email not verified. Please verify your email to continue.",
            "Resend Verification Email",
        )
    }

    const token = await userRepository.createToken(pick(user.toObject(), ['_id', 'name', 'email']));
    return {token, user};
}