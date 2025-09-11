const router = require("../package").express.Router();
const authenticate = require("../middlewares/authenticate.middleware");
const {
    amenityController:{
        createAmenity,
        getAmenityById,
        getPaginatedAmenities,
        updateAmenityById,
        removeAmenityById,
        getAmenitiesGroupedByCategory,
        updateByType
    }} = require("../controllers");

router.use(authenticate);


router
    .route('/')
    .post(createAmenity)
    .get(getPaginatedAmenities);

router
    .get('/grouped', getAmenitiesGroupedByCategory);

router
    .route('/:id')
    .get(getAmenityById)
    .patch(updateAmenityById)
    .delete(removeAmenityById);

router
    .patch('/:id/type/:type', updateByType);

module.exports = router;