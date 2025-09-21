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
const {authLimiter, apiLimiter} = require("../middlewares/rateLimiter.middleware");
const authenticate = require("../middlewares/authenticate.middleware");

const defaultRoutes = [
    {
        path: "/auth",
        route: authRoutes,
        middlewares: [authLimiter]
    },
    {
        path: "/user",
        route: userRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: "/amenity-category",
        route: amenityCategory,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: "/amenity",
        route: amenityRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: "/hotel-category",
        route: hotelCategoryRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: "/hotel",
        route: hotelRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: "/subscription",
        route: subscriptionRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: "/subscription-plans",
        route: subscriptionPlanRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: "/room",
        route: roomRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: "/",
        route: emailVerificationRoutes,
        middlewares: [apiLimiter]
    },
]

const prefixUrl = env === 'production'
    ? ''
    : env === 'test'
        ? '/api/test'
        : '/api/dev';

defaultRoutes.forEach((route) => {
    router.use(`${prefixUrl}${route.path}`, ...route.middlewares, route.route);
});

module.exports = router;