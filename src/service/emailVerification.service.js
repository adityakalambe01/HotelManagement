const { emailVerificationRepository, userRepository } = require("../repository");
const { sendEmail } = require("../utils/email.util");
const { httpCodes } = require("../config");
const { ApiError } = require("../utils");

const APP_URL = process.env.DOMAIN || "http://localhost:3000";

/**
 * Triggers email verification for a newly registered user.
 */
exports.triggerEmailVerification = async (user) => {
    const token = await emailVerificationRepository.sendEmailVerification(user._id);

    const verificationLink = `${APP_URL}/verify-email?token=${token}`;

    const subject = "Verify your email";
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
            <h2 style="color: #333;">Hi ${user.name},</h2>
    
            <p style="font-size: 16px; color: #555;">
                Thanks for registering on <strong>Taskmate Pro</strong>! Please verify your email by clicking the button below:
            </p>
    
            <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}" style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                    Verify Email
                </a>
            </div>
        
            <p style="font-size: 14px; color: #999;">
                If the button above doesn't work, please copy and paste the following link into your browser:
            </p>
        
            <p style="word-break: break-word; color: #007bff;">
                <a href="${verificationLink}" style="color: #007bff;">${verificationLink}</a>
            </p>
        
            <p style="font-size: 14px; color: #999;">This link will expire in 5 minutes.</p>
        
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        
            <p style="font-size: 12px; color: #aaa; text-align: center;">
                © ${new Date().getFullYear()} Taskmate Pro. All rights reserved.
            </p>
        </div>
`;


    await sendEmail(user.email, subject, html);
};

/**
 * Handles email verification request.
 */
exports.verifyEmail = async (token) => {
    const record = await emailVerificationRepository.findByToken(token);

    if (!record || new Date(record.expiresAt) < new Date()) {
        throw new ApiError(httpCodes.BAD_REQUEST, "Invalid or expired verification link");
    }

    const user = await userRepository.userById(record.userId);
    if (!user) {
        throw new ApiError(httpCodes.NOT_FOUND, "User not found");
    }

    if (user.isEmailVerified) {
        await emailVerificationRepository.deleteByUserId(user._id); // cleanup
        return { message: "Email already verified" };
    }

    await userRepository.markEmailAsVerified(user._id);
    await emailVerificationRepository.deleteByUserId(user._id);

    return { message: "Email verified successfully" };
};

/**
 * Resend verification link.
 */
exports.resendVerification = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new ApiError(httpCodes.NOT_FOUND, "User not found");
    }
    if (user.isEmailVerified) {
        throw new ApiError(httpCodes.BAD_REQUEST, "Email is already verified");
    }

    const hasPending = await emailVerificationRepository.hasPendingVerification(user._id);
    if (hasPending) {
        throw new ApiError(httpCodes.TOO_MANY_REQUESTS, "A verification email is already pending. Please wait.");
    }

    await this.triggerEmailVerification(user);
    return { message: "Verification email resent successfully" };
};