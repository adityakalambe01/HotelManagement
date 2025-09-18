const { ApiError } = require("../utils");
const { httpCodes } = require("../config");
const { hotelRepository: {
    create,
    hotelById,
    hotels,
    update,
    deleteHotel,
    findOne,
    findMany,
    countHotels,
    exists,
    aggregate
} } = require("../repository");

/**
 * Creates a new hotel in the system
 * @param {Object} hotelData - The data for creating a new hotel
 * @param {string} hotelData.owner - The ID of the hotel owner (User)
 * @param {string} hotelData.name - The name of the hotel
 * @param {string} [hotelData.description] - Description of the hotel
 * @param {Object} [hotelData.address] - Hotel's address information
 * @param {string} [hotelData.category] - The ID of the hotel category
 * @param {string} [hotelData.subscription] - The ID of the hotel's subscription
 * @param {Array<string>} [hotelData.amenities] - Array of amenity IDs
 * @param {Array<string>} [hotelData.staff] - Array of staff user IDs
 * @returns {Promise<Object>} The created hotel object
 * @throws {ApiError} If hotel creation fails
 */
exports.createHotel = async (hotelData) => {
    const newHotel = await create(hotelData);
    if (!newHotel) {
        throw new ApiError(httpCodes.BAD_REQUEST, "Failed to create hotel. Please check the provided data and try again.");
    }
    return newHotel;
}

/**
 * Retrieves a hotel by its ID
 * @param {string} id - The ID of the hotel to retrieve
 * @returns {Promise<Object>} The hotel object
 * @throws {ApiError} If hotel is not found
 */
exports.getHotelById = async (id) => {
    const hotel = await hotelById(id);
    if (!hotel) {
        throw new ApiError(httpCodes.NOT_FOUND, `Hotel with ID ${id} was not found. Please verify the ID and try again.`);
    }
    return hotel;
}

/**
 * Retrieves hotels based on filter criteria with pagination
 * @param {Object} [filter={}] - Filter criteria for hotels
 * @param {Object} [options={}] - Pagination and sorting options
 * @returns {Promise<Object>} Paginated list of hotels
 */
exports.getHotels = async (filter = {}, options = {}) => hotels(filter, options);

/**
 * Updates a hotel by its ID
 * @param {string} id - The ID of the hotel to update
 * @param {Object} updateData - The data to update
 * @returns {Promise<Object>} The updated hotel object
 * @throws {ApiError} If hotel update fails or hotel not found
 */
exports.updateHotel = async (id, updateData) => {
    await getHotelById(id);
    const updatedHotel = await update(id, updateData);
    if (!updatedHotel) {
        throw new ApiError(httpCodes.BAD_REQUEST, `Failed to update hotel with ID ${id}. Please verify the provided data and try again.`);
    }
    return updatedHotel;
}

/**
 * Soft deletes a hotel by its ID
 * @param {string} id - The ID of the hotel to delete
 * @returns {Promise<Object>} The deleted hotel object
 * @throws {ApiError} If hotel deletion fails or hotel not found
 */
exports.deleteHotel = async (id) => {
    await getHotelById(id);
    const deletedHotel = await deleteHotel(id);
    if (!deletedHotel) {
        throw new ApiError(httpCodes.BAD_REQUEST, `Failed to delete hotel with ID ${id}. Please try again later.`);
    }
    return deletedHotel;
}

/**
 * Finds a single hotel based on filter criteria
 * @param {Object} filter - The filter criteria
 * @returns {Promise<Object>} The found hotel object
 * @throws {ApiError} If hotel is not found
 */
exports.findHotel = async (filter) => {
    const hotel = await findOne(filter);
    if (!hotel) {
        throw new ApiError(httpCodes.NOT_FOUND, "Hotel not found");
    }
    return hotel;
}

/**
 * Finds multiple hotels based on filter criteria
 * @param {Object} filter - The filter criteria
 * @returns {Promise<Array>} Array of found hotels
 */
exports.findHotels = async (filter) => {
    const hotels = await findMany(filter);
    return hotels;
}

/**
 * Counts hotels based on filter criteria
 * @param {Object} [filter={}] - The filter criteria
 * @returns {Promise<number>} The count of hotels
 * @throws {ApiError} If no hotels are found
 */
exports.countHotels = async (filter = {}) => {
    const count = await countHotels(filter);
    if (count === 0) {
        throw new ApiError(httpCodes.NOT_FOUND, "No hotels found");
    }
    return count;
}

/**
 * Checks if a hotel exists based on filter criteria
 * @param {Object} filter - The filter criteria
 * @returns {Promise<boolean>} True if hotel exists, false otherwise
 * @throws {ApiError} If hotel is not found
 */
exports.hotelExists = async (filter) => {
    const hotel = await exists(filter);
    if (!hotel) {
        throw new ApiError(httpCodes.NOT_FOUND, "Hotel not found");
    }
    return hotel;
}

/**
 * Checks if a hotel exists by name
 * @param {string} name - The name of the hotel to check
 * @returns {Promise<Object>} The hotel object if found
 * @throws {ApiError} If hotel is not found
 */
exports.hotelExistsByName = async (name) => {
    const hotel = await exists({name});
    if (!hotel) {
        throw new ApiError(httpCodes.NOT_FOUND, "Hotel not found");
    }
    return hotel;
}

/**
 * Checks if a hotel exists for a specific owner
 * @param {string} ownerId - The ID of the owner to check
 * @returns {Promise<Object>} The hotel object if found
 * @throws {ApiError} If hotel is not found
 */
exports.hotelExistsByOwner = async (ownerId) => {
    const hotel = await exists({owner: ownerId});
    if (!hotel) {
        throw new ApiError(httpCodes.NOT_FOUND, "Hotel not found");
    }
    return hotel;
}

/**
 * Checks if any hotel has a specific amenity
 * @param {string} amenityId - The ID of the amenity to check
 * @returns {Promise<Object>} The hotel object if found
 * @throws {ApiError} If hotel is not found
 */
exports.hotelExistsWithAmenity = async (amenityId) => {
    const hotel = await exists({amenities: amenityId});
    if (!hotel) {
        throw new ApiError(httpCodes.NOT_FOUND, "Hotel not found");
    }
    return hotel;
}

/**
 * Checks if any hotel exists in a specific city
 * @param {string} city - The city to check
 * @returns {Promise<Object>} The hotel object if found
 * @throws {ApiError} If hotel is not found
 */
exports.hotelExistsInCity = async (city) => {
    const hotel = await exists({"address.city": city});
    if (!hotel) {
        throw new ApiError(httpCodes.NOT_FOUND, "Hotel not found");
    }
    return hotel;
}

/**
 * Groups hotels by city and counts them
 * @returns {Promise<Array>} Array of objects containing city and count
 */
exports.aggregateHotelsByCity = async () => {
    const pipeline = [
        {$group: {_id: "$address.city", count: {$sum: 1}}},
        {$sort: {count: -1}}
    ];
    return aggregate(pipeline);
};

/**
 * Gets average rating by city
 * @returns {Promise<Array>} Array of objects containing city, average rating and count
 */
exports.aggregateAverageRatingByCity = async () => {
    const pipeline = [
        {$group: {_id: "$address.city", avgRating: {$avg: "$rating"}, count: {$sum: 1}}},
        {$sort: {avgRating: -1}}
    ];
    return aggregate(pipeline);
};

/**
 * Counts hotels by category
 * @returns {Promise<Array>} Array of objects containing category and count
 */
exports.aggregateCountByCategory = async () => {
    const pipeline = [
        {$group: {_id: "$category", count: {$sum: 1}}},
        {$sort: {count: -1}}
    ];
    return aggregate(pipeline);
};

/**
 * Counts how many hotels are using each amenity
 * @returns {Promise<Array>} Array of objects containing amenity ID and usage count, sorted by count descending
 */
exports.aggregateAmenitiesUsage = async () => {
    const pipeline = [
        {$unwind: "$amenities"},
        {$group: {_id: "$amenities", count: {$sum: 1}}},
        {$sort: {count: -1}}
    ];
    return aggregate(pipeline);
};

/**
 * Gets the top rated hotels
 * @param {number} [limit=10] - Maximum number of hotels to return
 * @returns {Promise<Array>} Array of top rated hotels with name, rating, address and category
 */
exports.aggregateTopRatedHotels = async (limit = 10) => {
    const pipeline = [
        {$sort: {rating: -1}},
        {$limit: limit},
        {$project: {name: 1, rating: 1, address: 1, category: 1}}
    ];
    return aggregate(pipeline);
};

/**
 * Gets hotels with the most amenities
 * @param {number} [limit=10] - Maximum number of hotels to return
 * @returns {Promise<Array>} Array of hotels sorted by amenity count, including name, amenity count, amenities and address
 */
exports.aggregateHotelsWithMostAmenities = async (limit = 10) => {
    const pipeline = [
        {$project: {name: 1, amenitiesCount: {$size: "$amenities"}, amenities: 1, address: 1}},
        {$sort: {amenitiesCount: -1}},
        {$limit: limit}
    ];
    return aggregate(pipeline);
};

/**
 * Groups hotels by subscription type and counts them
 * @returns {Promise<Array>} Array of objects containing subscription type and hotel count
 */
exports.aggregateHotelsBySubscription = async () => {
    const pipeline = [
        {$group: {_id: "$subscription", count: {$sum: 1}}},
        {$sort: {count: -1}}
    ];
    return aggregate(pipeline);
};

/**
 * Gets hotels with the most staff members
 * @param {number} [limit=10] - Maximum number of hotels to return
 * @returns {Promise<Array>} Array of hotels sorted by staff count, including name, staff count, staff list and address
 */
exports.aggregateHotelsByStaffCount = async (limit = 10) => {
    const pipeline = [
        {$project: {name: 1, staffCount: {$size: "$staff"}, staff: 1, address: 1}},
        {$sort: {staffCount: -1}},
        {$limit: limit}
    ];
    return aggregate(pipeline);
};

/**
 * Gets count of hotels created per month/year
 * @returns {Promise<Array>} Array of objects containing year, month and hotel count
 */
exports.aggregateHotelsCreatedPerMonth = async () => {
    const pipeline = [
        {
            $group: {
                _id: {year: {$year: "$createdAt"}, month: {$month: "$createdAt"}},
                count: {$sum: 1}
            }
        },
        {$sort: {"_id.year": -1, "_id.month": -1}}
    ];
    return aggregate(pipeline);
};

/**
 * Gets average rating for each hotel category
 * @returns {Promise<Array>} Array of objects containing category, average rating and hotel count
 */
exports.aggregateAverageRatingByCategory = async () => {
    const pipeline = [
        {$group: {_id: "$category", avgRating: {$avg: "$rating"}, count: {$sum: 1}}},
        {$sort: {avgRating: -1}}
    ];
    return aggregate(pipeline);
};

exports.aggregateMostCommonCategories = async () => {
    const pipeline = [
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ];
    return aggregate(pipeline);
};
/**
 * Gets distribution of hotels by country
 * @returns {Promise<Array>} Array of objects containing country and hotel count, sorted by count descending
 */
exports.aggregateHotelsByCountry = async () => {
    const pipeline = [
        {$group: {_id: "$address.country", count: {$sum: 1}}},
        {$sort: {count: -1}}
    ];
    return aggregate(pipeline);
};

/**
 * Gets distribution of hotels by state/province
 * @returns {Promise<Array>} Array of objects containing state and hotel count, sorted by count descending
 */
exports.aggregateHotelsByState = async () => {
    const pipeline = [
        {$group: {_id: "$address.state", count: {$sum: 1}}},
        {$sort: {count: -1}}
    ];
    return aggregate(pipeline);
};