const {hotelCategoryModel: HotelCategory} = require('../models');

/**
 * Creates a new hotel category
 * @param {Object} hotelCategory - The hotel category data to create
 * @returns {Promise<Object>} The created hotel category
 */
exports.newHotelCategory = async (hotelCategory) => await HotelCategory.create(hotelCategory);

/**
 * Updates a hotel category
 * @param {string} id - The ID of the hotel category to update
 * @param {Object} hotelCategory - The updated hotel category data
 * @returns {Promise<Object>} The result of the update operation
 */
exports.updateHotel = async (id, hotelCategory) => await HotelCategory.updateOne({_id: id}, hotelCategory, {new: true});

/**
 * Deletes a hotel category
 * @param {string} id - The ID of the hotel category to delete
 * @returns {Promise<Object>} The result of the delete operation
 */
exports.deleteHotel = async (id) => await HotelCategory.deleteOne({_id: id});

/**
 * Retrieves hotel categories with pagination
 * @param {Object} filter - The filter criteria for hotel categories
 * @param {Object} options - The pagination and sorting options
 * @returns {Promise<Object>} The paginated list of hotel categories
 */
exports.hotelCategories = async (filter, options) => await HotelCategory.paginate(filter, options);

/**
 * Retrieves a hotel category by ID
 * @param {string} id - The ID of the hotel category to retrieve
 * @returns {Promise<Object>} The found hotel category
 */
exports.HotelCategory = async (id) => await HotelCategory.findById(id);


/**
 * Retrieves all hotel categories without pagination
 * @param {Object} filter - The filter criteria for hotel categories
 * @param {Object} options - The pagination and sorting options
 * @returns {Promise<Object>} The paginated list of hotel categories
 */
exports.hotelCategoriesWithoutPagination = async (filter, options) => await HotelCategory.find(filter).setOptions(options);
