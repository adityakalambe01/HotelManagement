const {amenityCategoryRepository: {create, update, categories, category, deleteById}} = require("../repository");
const {ApiError} = require("../utils");
const {httpCodes} = require("../config");

/**
 * Creates a new amenity category
 * @param {Object} amenityCategory - The amenity category data to create
 * @returns {Promise<Object>} The created amenity category
 * @throws {ApiError} If creation fails
 */
exports.newAmenityCategory = async (amenityCategory) => {
    const saved = await create(amenityCategory);
    if (!saved) {
        throw new ApiError(
            httpCodes.INTERNAL_SERVER_ERROR,
            "Failed to create amenity category"
        );
    }
    return saved;
}

/**
 * Updates an existing amenity category
 * @param {string} _id - The ID of the amenity category to update
 * @param {Object} amenityCategory - The updated amenity category data
 * @returns {Promise<Object>} The updated amenity category
 * @throws {ApiError} If update fails or category not found
 */
exports.updateAmenityCategory = async (_id, amenityCategory) => {
    const updated = await update(_id, amenityCategory);
    if (!updated) {
        throw new ApiError(
            httpCodes.NOT_FOUND,
            "Amenity category not found or update failed"
        );
    }
    return updated;
}

/**
 * Retrieves all amenity categories with filtering and pagination
 * @param {Object} filter - Filter criteria for the categories
 * @param {Object} options - Pagination and sorting options
 * @returns {Promise<Object>} Paginated list of amenity categories
 */
exports.getAllAmenityCategories = async (filter, options) => {
    return await categories(filter, options);
}

/**
 * Retrieves a specific amenity category by ID
 * @param {string} _id - The ID of the amenity category to retrieve
 * @returns {Promise<Object>} The requested amenity category
 * @throws {ApiError} If category not found
 */
exports.getAmenityCategory = async (_id) => {
    const dbCategory = await category(_id);
    if (!dbCategory) {
        throw new ApiError(
            httpCodes.NOT_FOUND,
            "Amenity category not found"
        );
    }
    return dbCategory;
}

/**
 * Deletes an amenity category by ID
 * @param {string} _id - The ID of the amenity category to delete
 * @returns {Promise<Object>} The deleted amenity category
 * @throws {ApiError} If deletion fails or category not found
 */
exports.deleteAmenityCategory = async (_id) => {
    const deleted = await deleteById(_id);
    if (!deleted) {
        throw new ApiError(
            httpCodes.NOT_FOUND,
            "Amenity category not found or already deleted"
        );
    }
    return deleted;
};