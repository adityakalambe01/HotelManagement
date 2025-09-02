const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middlewares/asyncHandler.middleware");
const { schemaValidator } = require("../middlewares/schemaValidator.middleware");
const { emailVerificationController } = require("../controllers");
const { resendVerificationSchema } = require("../validations").emailVerification;

// GET /verify-email?token=xxx
router.get("/verify-email", asyncHandler(emailVerificationController.verifyEmail));

// POST /resend-verification
router.post(
    "/resend-verification",
    schemaValidator(resendVerificationSchema),
    asyncHandler(emailVerificationController.resendVerification)
);

module.exports = router;