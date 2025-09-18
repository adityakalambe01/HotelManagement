const router = require("../package").express.Router();
const config = require("../config");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const amenityCategory = require("./amenityCategory.routes");
const amenityRoutes = require("./amenity.routes");
const emailVerificationRoutes = require("./emailVerification.routes");
const hotelCategoryRoutes = require("./hotelCategory.routes");
const hotelRoutes = require("./hotel.routes");
const subscriptionPlanRoutes = require("./subscriptionPlan.routes");
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
        path: "/subscription-plans",
        route: subscriptionPlanRoutes,
        middlewares: [authenticate, apiLimiter]
    },
    {
        path: "/",
        route: emailVerificationRoutes,
        middlewares: [apiLimiter]
    },
]

switch (config.env) {
    case 'development':
        defaultRoutes.forEach((route) => {
            router.use(`/api/dev${route.path}`, ...route.middlewares, route.route);
        });
        break;
    case 'test':
        defaultRoutes.forEach((route) => {
            router.use(`/api/test${route.path}`, ...route.middlewares, route.route);
        });
        break;
    case 'production':
        defaultRoutes.forEach((route) => {
            router.use(route.path, ...route.middlewares, route.route);
        })
        break;
    default:
        break;
}

module.exports = router;