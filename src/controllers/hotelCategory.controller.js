const {
    hotelCategoryService: {
        newHotelCategory,
        updateHotelCategory,
        deleteHotelCategory,
        getAllHotelCategories,
        getHotelCategory
    }
} = require('../service');
const {asyncHandler} = require('../middlewares/asyncHandler.middleware');
const {pick, reqQueryFilterOptionsPicker, paramsPicker} = require("../utils");

/**
 * Extracts relevant hotel category fields from request body
 * @param {Object} body - The request body
 * @returns {Object} Filtered hotel category data
 */
function hotelBody(body) {
    return pick(body, ['name', 'description', 'icon']);
}

/**
 * Creates a new hotel category
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Created hotel category with success message
 */
exports.newHotelCategory = asyncHandler(async (req, res) => {
    const body = hotelBody(req.body);
    const hotelCategory = await newHotelCategory(body);
    return res.created(hotelCategory, "New hotel category has been created successfully");
});

/**
 * Updates an existing hotel category
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated hotel category with success message
 */
exports.updateHotelCategory = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ['id']);
    const body = hotelBody(req.body);
    const hotelCategory = await updateHotelCategory(id, body);
    return res.ok(hotelCategory, "Hotel category has been updated successfully");
});

/**
 * Deletes a hotel category
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Deleted hotel category with success message
 */
exports.deleteHotelCategory = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ['id']);
    const hotelCategory = await deleteHotelCategory(id);
    return res.ok(hotelCategory, "Hotel category has been deleted successfully");
})

/**
 * Gets all hotel categories with optional filters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of hotel categories with success message
 */
exports.getAllHotelCategories = asyncHandler(async (req, res) => {
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const hotelCategories = await getAllHotelCategories(filter, options);
    return res.ok(hotelCategories, "Hotel categories have been retrieved successfully");
})

/**
 * Gets a single hotel category by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Hotel category with success message
 */
exports.getHotelCategory = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ['id']);
    const hotelCategory = await getHotelCategory(id);
    return res.ok(hotelCategory, "Hotel category has been retrieved successfully");
})

