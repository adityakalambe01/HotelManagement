const {email} = require("./shared.validation");
const {JOI} = require("../package");
const resendVerificationSchema = JOI.object({
    email: email
});

module.exports = {
    resendVerificationSchema
}