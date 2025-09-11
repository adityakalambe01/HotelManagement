const router = require("../package").express.Router();
const config = require("../config");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const amenityCategory = require("./amenityCategory.routes");
const emailVerificationRoutes = require("./emailVerification.routes");
const hotelCategoryRoutes = require("./hotelCategory.routes");

const defaultRoutes = [
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/amenity-category",
        route: amenityCategory
    },
    {
        path: "/hotel-category",
        route: hotelCategoryRoutes
    },
    {
        path: "/",
        route: emailVerificationRoutes
    },
]

switch (config.env) {
    case 'development':
        defaultRoutes.forEach((route) => {
            router.use(`/api/dev${route.path}`, route.route);
        });
        break;
    case 'test':
        defaultRoutes.forEach((route) => {
            router.use(`/api/test${route.path}`, route.route);
        });
        break;
    case 'production':
        defaultRoutes.forEach((route) => {
            router.use(route.path, route.route);
        })
        break;
    default:
        break;
}

module.exports = router;