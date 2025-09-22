const router = require("../package").express.Router();
const {env} = require("../config");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const amenityCategory = require("./amenityCategory.routes");
const amenityRoutes = require("./amenity.routes");
const emailVerificationRoutes = require("./emailVerification.routes");
const hotelCategoryRoutes = require("./hotelCategory.routes");
const hotelRoutes = require("./hotel.routes");
const subscriptionRoutes = require("./subscription.routes");
const subscriptionPlanRoutes = require("./subscriptionPlan.routes");
const roomRoutes = require("./room.routes");
const bookingRoutes = require("./booking.routes");
const paymentRoutes = require("./payment.routes");
const {authLimiter, apiLimiter} = require("../middlewares/rateLimiter.middleware");
const authenticate = require("../middlewares/authenticate.middleware");
const {
    mainIndex:{
        AUTH,
        USER,
        AMENITY_CATEGORY,
        AMENITY,
        HOTEL_CATEGORY,
        HOTEL,
        SUBSCRIPTION,
        SUBSCRIPTION_PLANS,
        ROOM,
        PAYMENT,
        EMAIL_VERIFICATION,
        BOOKING
    },
    nodeEnv:{
        PRODUCTION_ENV,
        DEVELOPMENT_ENV,
        TEST_ENV
    },
    prefixURLs:{
        PRODUCTION_PREFIX_URL,
        DEVELOPMENT_PREFIX_URL,
        TEST_PREFIX_URL
    }} = require("../constant");

const defaultRoutes = [
    {
        path: AUTH,
        route: authRoutes,
        middlewares: [authLimiter]
    },
    {
        path: USER,
        route: userRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: AMENITY_CATEGORY,
        route: amenityCategory,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: AMENITY,
        route: amenityRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: HOTEL_CATEGORY,
        route: hotelCategoryRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: HOTEL,
        route: hotelRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: SUBSCRIPTION,
        route: subscriptionRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: SUBSCRIPTION_PLANS,
        route: subscriptionPlanRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: ROOM,
        route: roomRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: PAYMENT,
        route: paymentRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: BOOKING,
        route: bookingRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: EMAIL_VERIFICATION,
        route: emailVerificationRoutes,
        middlewares: [apiLimiter]
    },
]

const prefixUrl = env === PRODUCTION_ENV
    ? PRODUCTION_PREFIX_URL
    : env === TEST_ENV
        ? TEST_PREFIX_URL
        : DEVELOPMENT_PREFIX_URL;

defaultRoutes.forEach((route) => {
    router.use(`${prefixUrl}${route.path}`, ...route.middlewares, route.route);
});

module.exports = router;