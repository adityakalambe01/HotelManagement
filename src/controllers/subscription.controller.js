const { subscriptionService } = require("../service");
const {
  pick,
  paramsPicker,
  reqQueryFilterOptionsPicker,
  ApiError,
} = require("../utils");
const { httpCodes } = require("../config");
const { asyncHandler } = require("../middlewares/asyncHandler.middleware");

/**
 * Creates a new subscription
 * @param {Object} req
 * @param {Object} res
 */
exports.createSubscription = asyncHandler(async (req, res) => {
  const subscription = await subscriptionService.createSubscription(req.body);
  return res.created(subscription, "Subscription created successfully");
});

/**
 * Gets subscription by ID
 * @param {Object} req
 * @param {Object} res
 */
exports.getSubscriptionById = asyncHandler(async (req, res) => {
  const { id } = paramsPicker(req, ["id"]);
  const subscription = await subscriptionService.findSubscriptionById(id);
  return res.ok(subscription, "Subscription details retrieved successfully");
});

/**
 * Gets all subscriptions with filtering options
 * @param {Object} req
 * @param {Object} res
 */
exports.getSubscriptions = asyncHandler(async (req, res) => {
  const { filter, options } = reqQueryFilterOptionsPicker(req);
  const result = await subscriptionService.findSubscriptions(filter, options);
  return res.ok(result, "All subscriptions retrieved successfully");
});

/**
 * Updates subscription by ID
 * @param {Object} req
 * @param {Object} res
 */
exports.updateSubscriptionById = asyncHandler(async (req, res) => {
  const { id } = paramsPicker(req, ["id"]);
  const subscription = await subscriptionService.updateSubscriptionById(
    id,
    req.body
  );
  return res.ok(subscription, "Subscription updated successfully");
});

/**
 * Removes subscription by ID (soft delete)
 * @param {Object} req
 * @param {Object} res
 */
exports.removeSubscriptionById = asyncHandler(async (req, res) => {
  const { id } = paramsPicker(req, ["id"]);
  const subscription = await subscriptionService.removeSubscriptionById(id);
  return res.ok(subscription, "Subscription deleted successfully");
});

/**
 * Gets all active subscriptions
 * @param {Object} req
 * @param {Object} res
 */
exports.getActiveSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await subscriptionService.findActiveSubscriptions();
  return res.ok(subscriptions, "Active subscriptions retrieved successfully");
});

/**
 * Gets all subscriptions for a specific hotel
 * @param {Object} req
 * @param {Object} res
 */
exports.getSubscriptionsByHotel = asyncHandler(async (req, res) => {
  const { hotelId } = paramsPicker(req, ["hotelId"]);
  const subscriptions = await subscriptionService.findSubscriptionsByHotel(
    hotelId
  );
  return res.ok(subscriptions, "Hotel subscriptions retrieved successfully");
});

/**
 * Updates specific field of a subscription
 * @param {Object} req
 * @param {Object} res
 */
exports.updateByType = asyncHandler(async (req, res) => {
  const { id, type } = paramsPicker(req, ["id", "type"]);
  let updatedSubscription;
  let message;

  switch (type) {
    case "plan":
      updatedSubscription = await subscriptionService.updateSubscriptionById(
        id,
        pick(req.body, ["plan"])
      );
      message = "Successfully updated subscription plan type";
      break;
    case "price":
      updatedSubscription = await subscriptionService.updateSubscriptionById(
        id,
        pick(req.body, ["price"])
      );
      message = "Successfully updated subscription price";
      break;
    case "status":
      updatedSubscription = await subscriptionService.updateSubscriptionById(
        id,
        pick(req.body, ["status"])
      );
      message = "Successfully updated subscription status";
      break;
    case "endDate":
      updatedSubscription = await subscriptionService.updateSubscriptionById(
        id,
        pick(req.body, ["endDate"])
      );
      message = "Successfully updated subscription end date";
      break;
    case "paymentHistory":
      updatedSubscription = await subscriptionService.updateSubscriptionById(
        id,
        pick(req.body, ["paymentHistory"])
      );
      message = "Successfully updated subscription payment history";
      break;
    default:
      throw new ApiError(
        httpCodes.BAD_REQUEST,
        "Invalid subscription field type"
      );
  }

  return res.ok(updatedSubscription, message);
});
