const router = require("../package").express.Router();
const {
  subscriptionController: {
    createSubscription,
    getSubscriptionById,
    getSubscriptions,
    updateSubscriptionById,
    removeSubscriptionById,
    getActiveSubscriptions,
    getSubscriptionsByHotel,
    updateByType,
  },
} = require("../controllers");

router.route("/").post(createSubscription).get(getSubscriptions);

router
  .get("/active", getActiveSubscriptions)
  .get("/by-hotel/:hotelId", getSubscriptionsByHotel);

router
  .route("/:id")
  .get(getSubscriptionById)
  .put(updateSubscriptionById)
  .delete(removeSubscriptionById);

router.patch("/:id/type/:type", updateByType);

module.exports = router;
