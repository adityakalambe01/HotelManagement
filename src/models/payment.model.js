const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");


const paymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }, // hotel owners pay for plans
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["credit_card", "debit_card", "upi", "paypal", "cash"], required: true },
    status: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
    transactionId: String,
    createdAt: { type: Date, default: Date.now },
});

paymentSchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
paymentSchema.plugin(paginatePlugin);
paymentSchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('Payment', paymentSchema, "Hotel Subscription And Room Booking Payments");
