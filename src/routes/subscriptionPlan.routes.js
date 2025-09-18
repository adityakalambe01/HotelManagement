const router = require("../package").express.Router();
const {
    subscriptionPlanController: {
        createPlan,
        getPlanById,
        getPlans,
        updatePlanById,
        removePlanById,
        getActivePlans,
        getPlanByName,
        updateByType
    }
} = require("../controllers");

router
    .route('/')
    .post(createPlan)
    .get(getPlans);

router
    .get('/active', getActivePlans)
    .get('/by-name', getPlanByName);

router
    .route("/:id")
    .get(getPlanById)
    .put(updatePlanById)
    .delete(removePlanById);

router
    .patch('/:id/type/:type', updateByType);

module.exports = router;