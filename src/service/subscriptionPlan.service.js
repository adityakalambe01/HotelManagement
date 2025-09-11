const {
    subscriptionPlanRepository: {
        createSubscriptionPlan,
        getSubscriptionPlanById,
        getSubscriptionPlans,
        updateSubscriptionPlan,
        softDeleteSubscriptionPlan,
        getActivePlans,
        getPlanByName
    }
} = require("../repository");
const {httpCodes: {NOT_FOUND, BAD_REQUEST}} = require("../config");
const {ApiError} = require("../utils");

/**
 * Creates a new subscription plan
 * @param {Object} data - The subscription plan data to create
 * @throws {ApiError} When plan creation fails
 * @returns {Promise<Object>} Created subscription plan
 */
exports.createPlan = async (data) => {
    const plan = await createSubscriptionPlan(data);
    if (!plan) throw new ApiError(BAD_REQUEST, "Unable to create subscription plan. Please check your input data and try again.");
    return plan;
};

/**
 * Retrieves a subscription plan by its ID
 * @param {string} id - The ID of the subscription plan to find
 * @throws {ApiError} When plan is not found
 * @returns {Promise<Object>} Found subscription plan
 */
exports.findPlanById = async (id) => {
    const plan = await getSubscriptionPlanById(id);
    if (!plan) throw new ApiError(NOT_FOUND, `Subscription plan with ID ${id} does not exist`);
    return plan;
};

/**
 * Retrieves subscription plans based on filter and pagination options
 * @param {Object} filter - Filter criteria for subscription plans
 * @param {Object} options - Pagination and sorting options
 * @returns {Promise<Object>} Paginated list of subscription plans
 */
exports.findPlans = async (filter = {}, options = {}) => {
    return await getSubscriptionPlans(filter, options);
};

/**
 * Updates a subscription plan by its ID
 * @param {string} id - The ID of the subscription plan to update
 * @param {Object} update - The update data for the subscription plan
 * @throws {ApiError} When plan update fails
 * @returns {Promise<Object>} Updated subscription plan
 */
exports.updatePlanById = async (id, update) => {
    await this.findPlanById(id);
    const plan = await updateSubscriptionPlan(id, update);
    if (!plan) throw new ApiError(NOT_FOUND, `Failed to update subscription plan with ID ${id}. Please try again.`);
    return plan;
};

/**
 * Soft deletes a subscription plan by its ID
 * @param {string} id - The ID of the subscription plan to delete
 * @throws {ApiError} When plan deletion fails
 * @returns {Promise<Object>} Deleted subscription plan
 */
exports.removePlanById = async (id) => {
    await this.findPlanById(id);
    const plan = await softDeleteSubscriptionPlan(id);
    if (!plan) throw new ApiError(NOT_FOUND, `Failed to delete subscription plan with ID ${id}. Please try again.`);
    return plan;
};

/**
 * Retrieves all active subscription plans
 * @returns {Promise<Array>} List of active subscription plans
 */
exports.findActivePlans = async () => {
    return await getActivePlans();
};

/**
 * Retrieves a subscription plan by its name
 * @param {string} planName - The name of the subscription plan to find
 * @throws {ApiError} When plan is not found
 * @returns {Promise<Object>} Found subscription plan
 */
exports.findPlanByName = async (planName) => {
    const plan = await getPlanByName(planName);
    if (!plan) throw new ApiError(NOT_FOUND, `Subscription plan '${planName}' does not exist`);
    return plan;
};