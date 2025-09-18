const {
    reqQueryFilterOptionsPicker,
    pick,
    paramsPicker
} = require("../utils");
const { asyncHandler } = require("../middlewares/asyncHandler.middleware");

const {
    hotelService:{
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
} = require("../service");

/**
 * Picks and formats the request body for hotel creation/update
 * @param {Object} request - Express request object
 * @returns {Object} Formatted hotel data with address and other fields
 */
function bodyPicker(request) {
    const address = pick(request.body.address, ['city', 'state', 'country', 'zipCode',])
    const body = pick(request.body, [
        'owner',
        'name',
        'description',
        'category',
        'subscription',
        'amenities',
        'staff',
        'rating',
        'images'
    ]);

    return {
        address,
        ...body
    }
}


/**
 * Creates a new hotel in the system
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing hotel details
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Created hotel object with success message
 * @throws {Error} If hotel creation fails
 */
exports.createHotel = asyncHandler(async (req, res) => {
    const body = bodyPicker(req);
    const hotel = await createHotel(body);
    return res.created(hotel, "Hotel created successfully");
});

/**
 * Retrieves a specific hotel by its ID
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - Hotel ID
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Hotel object with success message
 * @throws {Error} If hotel is not found
 */
exports.getHotelById = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ["id"]);
    const hotel = await getHotelById(id);
    return res.ok(hotel, "Hotel retrieved successfully");
});

/**
 * Retrieves hotels based on filter criteria with pagination
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering and pagination
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of hotels with success message
 */
exports.getHotels = asyncHandler(async (req, res) => {
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const hotels = await getHotels(filter, options);
    return res.ok(hotels, "Hotels retrieved successfully");
});

/**
 * Updates a specific hotel by its ID
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - Hotel ID
 * @param {Object} req.body - Updated hotel data
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated hotel object with success message
 * @throws {Error} If hotel update fails
 */
exports.updateHotel = asyncHandler(async (req, res) => {
    const body = bodyPicker(req);
    const {id} = paramsPicker(req, ["id"]);
    const hotel = await updateHotel(id, body);
    return res.ok(hotel, "Hotel updated successfully");
});

/**
 * Deletes a specific hotel by its ID
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - Hotel ID
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Deleted hotel object with success message
 * @throws {Error} If hotel deletion fails
 */
exports.deleteHotel = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ["id"]);
    const hotel = await deleteHotel(id);
    return res.ok(hotel, "Hotel deleted successfully");
});

/**
 * Finds a single hotel matching the filter criteria
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Matching hotel object with success message
 */
exports.findHotel = asyncHandler(async (req, res) => {
    const {filter} = reqQueryFilterOptionsPicker(req)
    const hotel = await findHotel(filter || {});
    return res.ok(hotel, "Hotel retrieved successfully");
});

/**
 * Finds multiple hotels matching the filter criteria
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of matching hotels with success message
 */
exports.findHotels = asyncHandler(async (req, res) => {
    const {filter} = reqQueryFilterOptionsPicker(req)
    const hotels = await findHotels(filter || {});
    return res.ok(hotels, "Hotels retrieved successfully");
});

/**
 * Counts hotels matching the filter criteria
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Count of matching hotels with success message
 */
exports.countHotels = asyncHandler(async (req, res) => {
    const {filter} = reqQueryFilterOptionsPicker(req)
    const count = await countHotels(filter || {});
    return res.ok({count}, "Hotel count retrieved successfully");
});

/**
 * Checks if a hotel exists based on filter criteria
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Boolean indicating if hotel exists with success message
 */
exports.hotelExists = asyncHandler(async (req, res) => {
    const {filter} = reqQueryFilterOptionsPicker(req)
    const exists = await hotelExists(filter || {});
    return res.ok({exists: !!exists}, "Hotel existence checked successfully");
});

/**
 * Checks if a hotel exists with the given name
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.name - Hotel name to check
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Boolean indicating if hotel exists with success message
 */
exports.hotelExistsByName = asyncHandler(async (req, res) => {
    const {name} = pick(req.query, ['name']);
    const exists = await hotelExistsByName(name);
    return res.ok({exists: !!exists}, "Hotel existence checked successfully");
});

/**
 * Checks if a hotel exists for a specific owner
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.ownerId - Owner ID to check
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Boolean indicating if hotel exists with success message
 */
exports.hotelExistsByOwner = asyncHandler(async (req, res) => {
    const {ownerId} = pick(req.query, ["ownerId"])
    const exists = await hotelExistsByOwner(ownerId);
    return res.ok({exists: !!exists}, "Hotel existence checked successfully");
});

/**
 * Checks if any hotel has a specific amenity
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.amenity - Amenity to check
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Boolean indicating if hotel exists with success message
 */
exports.hotelExistsWithAmenity = asyncHandler(async (req, res) => {
    const {amenity} = pick(req.query, ["amenity"])
    const exists = await hotelExistsWithAmenity(amenity);
    return res.ok({exists: !!exists}, "Hotel existence checked successfully");
});

/**
 * Checks if any hotel exists in a specific city
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.city - City to check
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Boolean indicating if hotel exists with success message
 */
exports.hotelExistsInCity = asyncHandler(async (req, res) => {
    const {city} = pick(req.query, ["city"])
    const exists = await hotelExistsInCity(city);
    return res.ok({exists: !!exists}, "Hotel existence checked successfully");
});

/**
 * Aggregates hotels grouped by city with count
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Hotels grouped by city with success message
 */
exports.aggregateHotelsByCity = asyncHandler(async (req, res) => {
    const result = await aggregateHotelsByCity();
    return res.ok(result, "Hotels grouped by city retrieved successfully");
});

/**
 * Aggregates average hotel ratings by city
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Average ratings by city with success message
 */
exports.aggregateAverageRatingByCity = asyncHandler(async (req, res) => {
    const result = await aggregateAverageRatingByCity();
    return res.ok(result, "Average ratings by city retrieved successfully");
});

/**
 * Aggregates hotel count by category
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Hotel counts by category with success message
 */
exports.aggregateCountByCategory = asyncHandler(async (req, res) => {
    const result = await aggregateCountByCategory();
    return res.ok(result, "Hotels grouped by category retrieved successfully");
});

/**
 * Aggregates count of hotels using each amenity
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Count of hotels per amenity with success message
 */
exports.aggregateAmenitiesUsage = asyncHandler(async (req, res) => {
    const result = await aggregateAmenitiesUsage();
    return res.ok(result, "Amenities usage retrieved successfully");
});

/**
 * Retrieves top-rated hotels with an optional limit
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {number} [req.query.limit=10] - Maximum number of hotels to return
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of top-rated hotels with success message
 */
exports.aggregateTopRatedHotels = asyncHandler(async (req, res) => {
    const {options} = reqQueryFilterOptionsPicker(req)
    const limit = options.limit ? parseInt(options.limit) : 10;
    const result = await aggregateTopRatedHotels(limit);
    return res.ok(result, "Top-rated hotels retrieved successfully");
});

/**
 * Retrieves hotels with the most amenities, limited by count
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {number} [req.query.limit=10] - Maximum number of hotels to return
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of hotels with most amenities and success message
 */
exports.aggregateHotelsWithMostAmenities = asyncHandler(async (req, res) => {
    const {options} = reqQueryFilterOptionsPicker(req)
    const limit = options.limit ? parseInt(options.limit) : 10;
    const result = await aggregateHotelsWithMostAmenities(limit);
    return res.ok(result, "Hotels with most amenities retrieved successfully");
});

/**
 * Aggregates hotels by their subscription type
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Hotels grouped by subscription type with success message
 */
exports.aggregateHotelsBySubscription = asyncHandler(async (req, res) => {
    const result = await aggregateHotelsBySubscription();
    return res.ok(result, "Hotels grouped by subscription type retrieved successfully");
});

/**
 * Aggregates hotels by staff count with an optional limit
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {number} [req.query.limit=10] - Maximum number of groups to return
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Hotels grouped by staff count with success message
 */
exports.aggregateHotelsByStaffCount = asyncHandler(async (req, res) => {
    const {options} = reqQueryFilterOptionsPicker(req)
    const limit = req.query.limit ? parseInt(options.limit) : 10;
    const result = await aggregateHotelsByStaffCount(limit);
    return res.ok(result, "Hotels grouped by staff count retrieved successfully");
});

/**
 * Aggregates hotels by their creation date (month/year)
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Hotels grouped by creation date with success message
 */
exports.aggregateHotelsCreatedPerMonth = asyncHandler(async (req, res) => {
    const result = await aggregateHotelsCreatedPerMonth();
    return res.ok(result, "Hotels created per month retrieved successfully");
});

/**
 * Aggregates average hotel ratings by category
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Average ratings per category with success message
 */
exports.aggregateAverageRatingByCategory = asyncHandler(async (req, res) => {
    const result = await aggregateAverageRatingByCategory();
    return res.ok(result, "Average ratings by category retrieved successfully");
});

/**
 * Retrieves the most common hotel categories
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Most common categories with success message
 */
exports.aggregateMostCommonCategories = asyncHandler(async (req, res) => {
    const result = await aggregateMostCommonCategories();
    return res.ok(result, "Most common hotel categories retrieved successfully");
});

/**
 * Aggregates hotels by country
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Hotels grouped by country with success message
 */
exports.aggregateHotelsByCountry = asyncHandler(async (req, res) => {
    const result = await aggregateHotelsByCountry();
    return res.ok(result, "Hotels grouped by country retrieved successfully");
});

/**
 * Aggregates hotels by state
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Hotels grouped by state with success message
 */
exports.aggregateHotelsByState = asyncHandler(async (req, res) => {
    const result = await aggregateHotelsByState();
    return res.ok(result, "Hotels grouped by state retrieved successfully");
});
