const {
  subscriptionRepository: {
    createSubscription,
    getSubscriptionById,
    getSubscriptions,
    updateSubscription,
    softDeleteSubscription,
    getActiveSubscriptions,
    getSubscriptionsByHotel,
  },
} = require("../repository");
const {
  httpCodes: { NOT_FOUND, BAD_REQUEST },
} = require("../config");
const { ApiError } = require("../utils");

/**
 * Creates a new subscription for a hotel
 * @param {Object} data - Subscription data to create
 * @throws {ApiError} When creation fails
 * @returns {Promise<Object>} Created subscription
 */
exports.createSubscription = async (data) => {
  const subscription = await createSubscription(data);
  if (!subscription) {
    throw new ApiError(
      BAD_REQUEST,
      "Unable to create subscription. Please check input data and try again."
    );
  }
  return subscription;
};

/**
 * Finds a subscription by its ID
 * @param {string} id - Subscription ID
 * @throws {ApiError} When subscription is not found
 * @returns {Promise<Object>} Subscription object
 */
exports.findSubscriptionById = async (id) => {
  const subscription = await getSubscriptionById(id);
  if (!subscription) {
    throw new ApiError(NOT_FOUND, `Subscription with ID ${id} does not exist`);
  }
  return subscription;
};

/**
 * Retrieves subscriptions with filters and pagination
 * @param {Object} filter - Filter criteriaa
 * @param {Object} options - Pagination & sorting options
 * @returns {Promise<Object>} Paginated subscriptions
 */
exports.findSubscriptions = async (filter = {}, options = {}) => {
  return await getSubscriptions(filter, options);
};

/**
 * Updates a subscription by its ID
 * @param {string} id - Subscription ID
 * @param {Object} update - Data to update
 * @throws {ApiError} When update fails
 * @returns {Promise<Object>} Updated subscription
 */
exports.updateSubscriptionById = async (id, update) => {
  await this.findSubscriptionById(id);
  const subscription = await updateSubscription(id, update);
  if (!subscription) {
    throw new ApiError(
      NOT_FOUND,
      `Failed to update subscription with ID ${id}. Please try again.`
    );
  }
  return subscription;
};

/**
 * Soft deletes a subscription by its ID
 * @param {string} id - Subscription ID
 * @throws {ApiError} When deletion fails
 * @returns {Promise<Object>} Deleted subscription
 */
exports.removeSubscriptionById = async (id) => {
  await this.findSubscriptionById(id);
  const subscription = await softDeleteSubscription(id);
  if (!subscription) {
    throw new ApiError(
      NOT_FOUND,
      `Failed to delete subscription with ID ${id}. Please try again.`
    );
  }
  return subscription;
};

/**
 * Retrieves all active subscriptions
 * @returns {Promise<Array>} List of active subscriptions
 */
exports.findActiveSubscriptions = async () => {
  return await getActiveSubscriptions();
};

/**
 * Retrieves all subscriptions for a given hotel
 * @param {string} hotelId - Hotel ID
 * @returns {Promise<Array>} List of hotel subscriptions
 */
exports.findSubscriptionsByHotel = async (hotelId) => {
  return await getSubscriptionsByHotel(hotelId);
};
