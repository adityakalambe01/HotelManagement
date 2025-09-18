const router = require("../package").express.Router();

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