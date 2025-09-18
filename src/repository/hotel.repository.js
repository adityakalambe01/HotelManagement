const {hotelModel: Hotel} = require("../models");

/**
 * Creates a new hotel in the database
 * @param {Object} newHotelData - The hotel data to create
 * @param {string} newHotelData.owner - The ID of the hotel owner (User)
 * @param {string} newHotelData.name - The name of the hotel
 * @param {string} [newHotelData.description] - Optional description of the hotel
 * @param {Object} [newHotelData.address] - The hotel's address information
 * @param {string} [newHotelData.category] - The ID of the hotel category
 * @param {string} [newHotelData.subscription] - The ID of the hotel's subscription
 * @param {Array<string>} [newHotelData.amenities] - Array of amenity IDs
 * @param {Array<string>} [newHotelData.staff] - Array of staff user IDs
 * @returns {Promise<Object>} The created hotel document
 */
exports.create = async (newHotelData) => {
    const hotel = new Hotel(newHotelData);
    return hotel.save();
};

/**
 * Retrieves a hotel by its ID
 * @param {string} _id - The ID of the hotel to find
 * @returns {Promise<Object|null>} The found hotel document or null if not found
 */
exports.hotelById = async (_id) => Hotel.findById(_id);

/**
 * Retrieves hotels with pagination support
 * @param {Object} [filter={}] - MongoDB filter criteria
 * @param {Object} [options={}] - Pagination options (limit, page, etc.)
 * @returns {Promise<{docs: Array, totalDocs: number, limit: number, page: number, totalPages: number}>}
 */
exports.hotels = async (filter = {}, options = {}) => Hotel.paginate(filter, options);

/**
 * Updates a hotel by its ID
 * @param {string} _id - The ID of the hotel to update
 * @param {Object} updateData - The update object containing the fields to modify
 * @returns {Promise<Object|null>} The updated hotel document or null if not found
 */
exports.update = async (_id, updateData) => Hotel.findByIdAndUpdate(_id, updateData, {new: true});

/**
 * Soft deletes a hotel by its ID
 * @param {string} _id - The ID of the hotel to delete
 * @returns {Promise<Object|null>} The deleted hotel document or null if not found
 */
exports.deleteHotel = async (_id) => Hotel.safeDeleteById(_id);

/**
 * Finds a single hotel that matches the filter criteria
 * @param {Object} filter - MongoDB filter criteria
 * @returns {Promise<Object|null>} The found hotel document or null if not found
 */
exports.findOne = async (filter) => Hotel.findOne(filter);

/**
 * Finds multiple hotels that match the filter criteria
 * @param {Object} filter - MongoDB filter criteria
 * @returns {Promise<Array<Object>>} Array of found hotel documents
 */
exports.findMany = async (filter) => Hotel.find(filter);

/**
 * Counts the number of hotels matching the filter criteria
 * @param {Object} [filter={}] - MongoDB filter criteria
 * @returns {Promise<number>} The count of matching hotels
 */
exports.countHotels = async (filter = {}) => Hotel.countDocuments(filter);

/**
 * Checks if any hotel exists matching the filter criteria
 * @param {Object} filter - MongoDB filter criteria
 * @returns {Promise<boolean>} True if matching hotel exists, false otherwise
 */
exports.exists = async (filter) => Hotel.exists(filter);

/**
 * Performs an aggregation pipeline on the hotels collection
 * @param {Array<Object>} pipeline - MongoDB aggregation pipeline stages
 * @returns {Promise<Array<Object>>} The aggregation results
 */
exports.aggregate = async (pipeline) => Hotel.aggregate(pipeline);