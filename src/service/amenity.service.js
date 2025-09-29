const {
    amenityRepository: {
        newAmenity,
        getAmenityById,
        getAmenities,
        updateAmenity,
        softDeleteAmenity,
        getAmenitiesGroupedByCategory
    },
    amenityCategoryRepository:{
        category:getCategoryByID
    }
} = require("../repository");
const {ApiError} = require("../utils");
const {httpCodes} = require("../config");

/**
 * Creates a new amenity
 * @param {Object} amenityData - Data for creating new amenity
 * @returns {Promise<Object>} Created amenity object
 * @throws {ApiError} If amenity creation fails
 */
exports.createAmenity = async (amenityData) => {
    const savedAmenity = await newAmenity(amenityData);
    if (!savedAmenity) throw new ApiError(httpCodes.BAD_REQUEST, 'Failed to create amenity');
    return savedAmenity;
};

/**
 * Finds an amenity by its ID
 * @param {string} id - Amenity ID to find
 * @returns {Promise<Object>} Found amenity object
 * @throws {ApiError} If amenity is not found
 */
exports.findAmenityById = async (id) => {
    const amenity = await getAmenityById(id);
    if (!amenity) throw new ApiError(httpCodes.NOT_FOUND, 'Amenity not found');
    return amenity;
};

/**
 * Gets paginated list of amenities
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} Paginated amenities result
 */
exports.paginatedAmenities = async (filter = {}, options = {}) => {
    return await getAmenities(filter, options);
};

/**
 * Updates an amenity by ID
 * @param {string} id - ID of amenity to update
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated amenity object
 * @throws {ApiError} If amenity update fails
 */
exports.updateAmenityById = async (id, updateData) => {
    await this.findAmenityById(id);
    const amenity = await updateAmenity(id, updateData);
    if (!amenity) throw new ApiError(httpCodes.BAD_REQUEST, 'Failed to update amenity');
    return amenity;
};

/**
 * Soft deletes an amenity by ID
 * @param {string} id - ID of amenity to delete
 * @returns {Promise<Object>} Result of deletion
 * @throws {ApiError} If amenity deletion fails
 */
exports.removeAmenityById = async (id) => {
    await this.findAmenityById(id);
    const result = await softDeleteAmenity(id);
    if (!result) throw new ApiError(httpCodes.BAD_REQUEST, 'Failed to delete amenity');
    return result;
};

/**
 * Gets amenities grouped by their categories
 * @returns {Promise<Object>} Amenities grouped by category
 */
exports.amenitiesGroupedByCategory = async () => {
    let result = await getAmenitiesGroupedByCategory();
    
    return await Promise.all(
        result.map(async(r)=> ({...r, category: await getCategoryByID(r.category)}))
    );
};