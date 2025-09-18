const router = require("../package").express.Router();

const {
    hotelController: {
        createHotel,
        getHotelById,
        getHotels,
        updateHotel,
        deleteHotel,
        findHotel,
        findHotels,
        countHotels,
        hotelExists,
        hotelExistsByName,
        hotelExistsByOwner,
        hotelExistsWithAmenity,
        hotelExistsInCity,
        aggregateHotelsByCity,
        aggregateAverageRatingByCity,
        aggregateCountByCategory,
        aggregateAmenitiesUsage,
        aggregateTopRatedHotels,
        aggregateHotelsWithMostAmenities,
        aggregateHotelsBySubscription,
        aggregateHotelsByStaffCount,
        aggregateHotelsCreatedPerMonth,
        aggregateAverageRatingByCategory,
        aggregateMostCommonCategories,
        aggregateHotelsByCountry,
        aggregateHotelsByState
    }
} = require("../controllers");

// CRUD routes
router
    .route("/")
    .post(createHotel)
    .get(getHotels);

router
    .route("/:id")
    .get(getHotelById)
    .put(updateHotel)
    .delete(deleteHotel);

// Query routes
router
    .get("/find-one", findHotel)
    .get("/find-many", findHotels)
    .get("/count", countHotels);

// Existence routes
router
    .get("/exists", hotelExists)
    .get("/exists/name", hotelExistsByName)
    .get("/exists/owner", hotelExistsByOwner)
    .get("/exists/amenity", hotelExistsWithAmenity)
    .get("/exists/city", hotelExistsInCity);

// Aggregate routes
router
    .get("/aggregate/city", aggregateHotelsByCity)
    .get("/aggregate/average-rating-city", aggregateAverageRatingByCity)
    .get("/aggregate/category", aggregateCountByCategory)
    .get("/aggregate/amenities-usage", aggregateAmenitiesUsage)
    .get("/aggregate/top-rated", aggregateTopRatedHotels)
    .get("/aggregate/most-amenities", aggregateHotelsWithMostAmenities)
    .get("/aggregate/subscription", aggregateHotelsBySubscription)
    .get("/aggregate/staff-count", aggregateHotelsByStaffCount)
    .get("/aggregate/created-per-month", aggregateHotelsCreatedPerMonth)
    .get("/aggregate/average-rating-category", aggregateAverageRatingByCategory)
    .get("/aggregate/most-common-categories", aggregateMostCommonCategories)
    .get("/aggregate/country", aggregateHotelsByCountry)
    .get("/aggregate/state", aggregateHotelsByState);

module.exports = router;