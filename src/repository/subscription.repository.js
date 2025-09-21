const { subscriptionModel } = require("../models");

/**
 * Creates a new subscription
 * @param {Object} data - The subscription data
 * @returns {Promise<Object>} Created subscription
 */
exports.createSubscription = async (data) =>
  await subscriptionModel.create(data);

/**
 * Gets subscription by ID
 * @param {string} id - Subscription ID
 * @returns {Promise<Object>} Found subscription
 */
exports.getSubscriptionById = async (id) =>
  await subscriptionModel.findById(id);

/**
 * Gets paginated subscriptions based on filter and options
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} Paginated subscriptions
 */
exports.getSubscriptions = async (filter = {}, options = {}) =>
  await subscriptionModel.paginate(filter, options);

/**
 * Updates a subscription by ID
 * @param {string} id - Subscription ID
 * @param {Object} update - Update data
 * @returns {Promise<Object>} Updated subscription
 */
exports.updateSubscription = async (id, update) =>
  await subscriptionModel.findByIdAndUpdate(id, update, { new: true });

/**
 * Soft deletes a subscription by ID
 * @param {string} id - Subscription ID
 * @returns {Promise<Object>} Deleted subscription
 */
exports.softDeleteSubscription = async (id) =>
  await subscriptionModel.safeDeleteById(id);

/**
 * Gets all active subscriptions
 * @returns {Promise<Array>} List of active subscriptions
 */
exports.getActiveSubscriptions = async () =>
  await subscriptionModel.find({ status: "active" });

/**
 * Gets all subscriptions for a specific hotel
 * @param {string} hotelId - Hotel ID
 * @returns {Promise<Array>} List of subscriptions for the hotel
 */
exports.getSubscriptionsByHotel = async (hotelId) =>
  await subscriptionModel.find({ hotel: hotelId });
