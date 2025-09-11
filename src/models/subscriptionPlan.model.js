const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");

/**
 * Schema definition for Subscription Plan
 * @typedef {Object} SubscriptionPlan
 * @property {string} plan - The name/type of the subscription plan (required)
 * @property {number} price - The cost of the subscription plan in currency units (required, min: 0)
 * @property {number} durationInMonths - Duration of the plan in months (required, min: 1)
 * @property {string[]} features - Array of features included in the plan
 * @property {number} maxRooms - Maximum number of rooms allowed in this plan (required, min: 1)
 * @property {boolean} isActive - Indicates if the plan is currently available for purchase (default: true)
 * @property {string} description - Detailed description of the plan (required)
 * @property {number} discountPercentage - Applicable discount percentage (0-100, default: 0)
 * @property {Date} createdAt - Timestamp when the plan was created (added by timestamps)
 * @property {Date} updatedAt - Timestamp when the plan was last updated (added by timestamps)
 * @property {Date} [deletedAt] - Timestamp for soft deletion (added by safeSoftDeletePlugin)
 */
const subscriptionPlanSchema = new mongoose.Schema({
    plan: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    durationInMonths: {type: Number, required: true, min: 1},
    features: [{type: String}],
    maxRooms: {type: Number, required: true, min: 1},
    isActive: {type: Boolean, default: true}, // Indicates if the plan is currently active and available for purchase
    description: {type: String, required: true},
    discountPercentage: {type: Number, min: 0, max: 100, default: 0}
}, {timestamps: true,});

// Add indexes for common query fields
subscriptionPlanSchema.index({plan: 1});
subscriptionPlanSchema.index({isActive: 1});

subscriptionPlanSchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
subscriptionPlanSchema.plugin(paginatePlugin);
subscriptionPlanSchema.plugin(privateFieldsPlugin);

/**
 * Mongoose model for Subscription Plans
 * @type {import('mongoose').Model<SubscriptionPlan>}
 */
module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema, "Subscription Plans");