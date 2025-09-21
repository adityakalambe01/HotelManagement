const { mongoose } = require('../package');
const { safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin } = require("./plugins");

const paymentSchema = new mongoose.Schema({

    /** References */
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }, // Hotel owners pay for plans
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    /** Payment Details */
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    method: {
        type: String,
        enum: ["credit_card", "debit_card", "upi", "paypal", "cash"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    transactionId: { type: String },
    invoiceNumber: { type: String },

    /** Financial Breakdown */
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    serviceCharge: { type: Number, default: 0 },

    /** Error / Refund Details */
    refundDate: { type: Date },
    errorCode: { type: String },
    errorMessage: { type: String },

    /** Metadata */
    notes: { type: String },

}, { timestamps: true });

/**  Plugins */
paymentSchema.plugin(safeSoftDeletePlugin, { deletedAtField: 'deletedAt' });
paymentSchema.plugin(paginatePlugin);
paymentSchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('Payment', paymentSchema, "Hotel Subscription And Room Booking Payments");
