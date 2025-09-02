const {mongoose} = require('../package');

const emailVerificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
        index: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // TTL Index (auto-delete when expired)
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('EmailVerification', emailVerificationSchema, "Sent Email Verifications");