const {subscriptionPlanService} = require("../service");
const {pick, paramsPicker, reqQueryFilterOptionsPicker, ApiError} = require("../utils");
const {httpCodes} = require("../config");
const {asyncHandler} = require("../middlewares/asyncHandler.middleware");

/**
 * Creates a new subscription plan
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Created subscription plan
 */
exports.createPlan = asyncHandler(async (req, res) => {
    const plan = await subscriptionPlanService.createPlan(req.body);
    return res.created(plan, "Subscription plan created successfully");
});

/**
 * Gets subscription plan by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Subscription plan details
 */
exports.getPlanById = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ["id"]);
    const plan = await subscriptionPlanService.findPlanById(id);
    return res.ok(plan, "Subscription plan details retrieved successfully");
});

/**
 * Gets all subscription plans with filtering options
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of subscription plans
 */
exports.getPlans = asyncHandler(async (req, res) => {
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const result = await subscriptionPlanService.findPlans(filter, options);
    return res.ok(result, "All subscription plans retrieved successfully");
});

/**
 * Updates subscription plan by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated subscription plan
 */
exports.updatePlanById = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ["id"]);
    const plan = await subscriptionPlanService.updatePlanById(id, req.body);
    return res.ok(plan, "Subscription plan details updated successfully");
});

/**
 * Removes subscription plan by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Removed subscription plan
 */
exports.removePlanById = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ["id"]);
    const plan = await subscriptionPlanService.removePlanById(id);
    return res.ok(plan, "Subscription plan deleted successfully");
});

/**
 * Gets all active subscription plans
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of active plans
 */
exports.getActivePlans = asyncHandler(async (req, res) => {
    const plans = await subscriptionPlanService.findActivePlans();
    return res.ok(plans, "Active subscription plans retrieved successfully");
});

/**
 * Gets subscription plan by name
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Subscription plan details
 */
exports.getPlanByName = asyncHandler(async (req, res) => {
    const {plan} = pick(req.query, ["plan"]);
    const result = await subscriptionPlanService.findPlanByName(plan);
    return res.ok(result, `Subscription plan '${plan}' details retrieved successfully`);
});

/**
 * Updates specific field of subscription plan
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated subscription plan
 */
exports.updateByType = asyncHandler(async (req, res) => {
    const {id, type} = paramsPicker(req, ['id', 'type']);
    let updatedPlan;
    let message;
    switch (type) {
        case 'plan':
            updatedPlan = await subscriptionPlanService.updatePlanById(id, pick(req.body, ['plan']));
            message = "Successfully updated plan name";
            break;
        case 'price':
            updatedPlan = await subscriptionPlanService.updatePlanById(id, pick(req.body, ['price']));
            message = "Successfully updated plan price";
            break;
        case 'discountPercentage':
            updatedPlan = await subscriptionPlanService.updatePlanById(id, pick(req.body, ['discountPercentage']));
            message = "Successfully updated discount percentage";
            break;
        case 'durationInMonths':
            updatedPlan = await subscriptionPlanService.updatePlanById(id, pick(req.body, ['durationInMonths']));
            message = "Successfully updated plan duration";
            break;
        case 'features':
            updatedPlan = await subscriptionPlanService.updatePlanById(id, pick(req.body, ['features']));
            message = "Successfully updated plan features";
            break;
        case 'maxRooms':
            updatedPlan = await subscriptionPlanService.updatePlanById(id, pick(req.body, ['maxRooms']));
            message = "Successfully updated maximum rooms limit";
            break;
        case 'isActive':
            updatedPlan = await subscriptionPlanService.updatePlanById(id, pick(req.body, ['isActive']));
            message = "Successfully updated plan status";
            break;
        case 'description':
            updatedPlan = await subscriptionPlanService.updatePlanById(id, pick(req.body, ['description']));
            message = "Successfully updated plan description";
            break;
        default:
            throw new ApiError(httpCodes.BAD_REQUEST, "Invalid plan field type");
    }
    return res.ok(updatedPlan, message);
})