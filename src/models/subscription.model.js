const {mongoose} = require("../package");
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");

const subscriptionSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    plan: { type: String, enum: ["basic", "standard", "premium"], required: true },
    price: Number,
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
    paymentHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
});

subscriptionSchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
subscriptionSchema.plugin(paginatePlugin);
subscriptionSchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('Subscription', subscriptionSchema, "Hotel Subscriptions");