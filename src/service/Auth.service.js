const { userRepository } = require("../repository");
const { httpCodes } = require("../config")
const { ApiError, pick} = require("../utils");
const {triggerEmailVerification} = require("./emailVerification.service")

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

    // user = pick(user.toObject(),['_id', 'name', 'email', 'createdAt', 'updatedAt'])
    // user.role.permissions = user.role.permissions.map(p => ({_id: p._id, name: p.name, description: p.description}));
    const token = await userRepository.createToken(pick(user, ['_id', 'name', 'email']));
    return {token, user};
}