const {
    hotelCategoryRepository: {
        newHotelCategory,
        updateHotel,
        deleteHotel,
        hotelCategories,
        hotelCategory,
        hotelCategoriesWithoutPagination
    }
} = require("../repository");
const {ApiError} = require("../utils");
const {httpCodes} = require("../config");

/**
 * Creates a new hotel category
 * @param {Object} hotelCategory - The hotel category data to create
 * @param {string} hotelCategory.name - The name of the hotel category
 * @returns {Promise<Object>} The created hotel category
 * @throws {ApiError} If the hotel category creation fails
 */
exports.newHotelCategory = async (hotelCategory) => {
    const newHotel = await newHotelCategory(hotelCategory);
    if (!newHotel) {
        throw new ApiError(
            httpCodes.BAD_REQUEST,
            "Failed to create hotel category. Please check the provided data and try again."
        );
    }
    return newHotel;
}

/**
 * Retrieves a hotel category by ID
 * @param {string} _id - The ID of the hotel category to retrieve
 * @returns {Promise<Object>} The found hotel category
 * @throws {ApiError} If the hotel category is not found
 */
exports.getHotelCategory = async (_id) => {
    const hotel = await hotelCategory(_id);
    if (!hotel) {
        throw new ApiError(
            httpCodes.BAD_REQUEST,
            `Hotel category with ID ${_id} was not found. Please verify the ID and try again.`
        );
    }
    return hotel;
}

/**
 * Updates a hotel category
 * @param {string} _id - The ID of the hotel category to update
 * @param {Object} updatedHotelCategory - The updated hotel category data
 * @returns {Promise<Object>} The updated hotel category
 * @throws {ApiError} If the hotel category update fails
 */
exports.updateHotelCategory = async (_id, updatedHotelCategory) => {
    await this.getHotelCategory(_id);
    const updatedHotel = await updateHotel(_id, updatedHotelCategory);
    if (!updatedHotel) {
        throw new ApiError(
            httpCodes.BAD_REQUEST,
            `Failed to update hotel category with ID ${_id}. Please verify the provided data and try again.`
        );
    }
    return updatedHotel;
}

/**
 * Deletes a hotel category
 * @param {string} _id - The ID of the hotel category to delete
 * @returns {Promise<Object>} The deleted hotel category
 * @throws {ApiError} If the hotel category deletion fails
 */
exports.deleteHotelCategory = async (_id) => {
    await this.getHotelCategory(_id);
    const deletedHotel = await deleteHotel(_id);
    if (!deletedHotel) {
        throw new ApiError(
            httpCodes.BAD_REQUEST,
            `Failed to delete hotel category with ID ${_id}. Please try again later.`
        );
    }
    return deletedHotel;
}

/**
 * Retrieves all hotel categories with optional filtering and pagination
 * @param {Object} filter - The filter criteria for hotel categories
 * @param {Object} options - The pagination and sorting options
 * @returns {Promise<Object>} The paginated list of hotel categories
 */
exports.getAllHotelCategories = async (filter, options) => await hotelCategories(filter, options);

/**
 * Retrieves all hotel categories with optional filtering and pagination
 * @param {Object} filter - The filter criteria for hotel categories
 * @param {Object} options - The sorting options
 * @returns {Promise<Object>} The list of hotel categories
 */
exports.getAllHotelCategoriesWithoutPagination = async (filter={}, options) => await hotelCategoriesWithoutPagination(filter, options);