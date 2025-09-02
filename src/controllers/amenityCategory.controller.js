const {
    amenityCategoryService: {
        newAmenityCategory,
        updateAmenityCategory,
        deleteAmenityCategory,
        getAllAmenityCategories,
        getAmenityCategory
    }
} = require("../service");

const {asyncHandler} = require("../middlewares/asyncHandler.middleware");
const {httpCodes} = require("../config");
const {
    pick,
    reqQueryFilterOptionsPicker,
    paramsPicker
} = require("../utils");

/**
 * Controller for creating a new amenity category
 * @param {Object} request - Express request object
 * @param {Object} request.body - Request body containing category data
 * @param {string} request.body.name - Name of the category
 * @param {string} request.body.description - Description of the category
 * @param {Object} response - Express response object
 * @returns {Promise<Object>} Created amenity category
 */
exports.newAmenityCategory = asyncHandler(async (request, response) => {
    const category = pick(request.body, ["name", "description"]);
    const savedAmenityCategory = await newAmenityCategory(category);
    return response.created(savedAmenityCategory, `Amenity Category '${category.name}' created successfully`);
});

/**
 * Controller for updating an existing amenity category
 * @param {Object} request - Express request object
 * @param {Object} request.body - Request body containing update data
 * @param {string} request.params.id - ID of the category to update
 * @param {Object} response - Express response object
 * @returns {Promise<Object>} Updated amenity category
 */
exports.updateAmenityCategory = asyncHandler(async (request, response) => {
    const category = pick(request.body, ["name", "description"]);
    const {id} = paramsPicker(request, ["id"]);
    const updatedAmenityCategory = await updateAmenityCategory(id, category);
    return response.ok(updatedAmenityCategory, `Amenity Category updated successfully`);
});

/**
 * Controller for retrieving a specific amenity category
 * @param {Object} request - Express request object
 * @param {string} request.params.id - ID of the category to retrieve
 * @param {Object} response - Express response object
 * @returns {Promise<Object>} Retrieved amenity category
 */
exports.getAmenityCategory = asyncHandler(async (request, response) => {
    const {id} = paramsPicker(request, ["id"]);
    const amenityCategory = await getAmenityCategory(id);
    return response.ok(amenityCategory, "Amenity Category retrieved successfully");
});

/**
 * Controller for retrieving all amenity categories with filtering and pagination
 * @param {Object} request - Express request object
 * @param {Object} request.query - Query parameters for filtering and pagination
 * @param {Object} response - Express response object
 * @returns {Promise<Object>} List of amenity categories
 */
exports.getAllAmenityCategories = asyncHandler(async (request, response) => {
    const {filter, options} = reqQueryFilterOptionsPicker(request);
    const amenityCategories = await getAllAmenityCategories(filter, options);
    return response.ok(amenityCategories, 'Amenity Categories retrieved successfully');
});

/**
 * Controller for deleting an amenity category
 * @param {Object} request - Express request object
 * @param {string} request.params.id - ID of the category to delete
 * @param {Object} response - Express response object
 * @returns {Promise<Object>} Deleted amenity category
 */
exports.deleteAmenityCategory = asyncHandler(async (request, response) => {
    const {id} = paramsPicker(request, ["id"]);
    const deletedAmenityCategory = await deleteAmenityCategory(id);
    return response.ok(deletedAmenityCategory, `Amenity Category '${deletedAmenityCategory.name}' deleted successfully`);
});