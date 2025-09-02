const {loginSchema, registerSchema} = require("./auth.validation");
const {resendVerificationSchema} = require("./emailVerification.validation");
module.exports = {
    auth: {
        loginSchema,
        registerSchema
    },
    emailVerification:{
        resendVerificationSchema
    },
}