const {subscriptionPlanModel} = require("../models");

/**
 * Creates a new subscription plan
 * @param {Object} data - The subscription plan data
 * @returns {Promise<Object>} Created subscription plan
 */
exports.createSubscriptionPlan = async (data) => subscriptionPlanModel.create(data);

/**
 * Gets subscription plan by ID
 * @param {string} id - Subscription plan ID
 * @returns {Promise<Object>} Found subscription plan
 */
exports.getSubscriptionPlanById = async (id) => subscriptionPlanModel.findById(id);

/**
 * Gets paginated subscription plans based on filter and options
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} Paginated subscription plans
 */
exports.getSubscriptionPlans = async (filter = {}, options = {}) => subscriptionPlanModel.paginate(filter, options);

/**
 * Updates a subscription plan by ID
 * @param {string} id - Subscription plan ID
 * @param {Object} update - Update data
 * @returns {Promise<Object>} Updated subscription plan
 */
exports.updateSubscriptionPlan = async (id, update) => subscriptionPlanModel.findByIdAndUpdate(id, update, {new: true});

/**
 * Soft deletes a subscription plan by ID
 * @param {string} id - Subscription plan ID
 * @returns {Promise<Object>} Deleted subscription plan
 */
exports.softDeleteSubscriptionPlan = async (id) => subscriptionPlanModel.safeDeleteById(id);

/**
 * Gets all active subscription plans
 * @returns {Promise<Array>} List of active subscription plans
 */
exports.getActivePlans = async () => subscriptionPlanModel.find({isActive: true});

/**
 * Gets a subscription plan by name
 * @param {string} planName - Name of the subscription plan
 * @returns {Promise<Object>} Found subscription plan
 */
exports.getPlanByName = async (planName) => subscriptionPlanModel.findOne({plan: planName});